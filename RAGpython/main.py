import streamlit as st
import os
from pathlib import Path
from dotenv import load_dotenv

# --- CONFIGURATION ---
load_dotenv()
st.set_page_config(page_title="IA Fiscaliste", page_icon="⚖️", layout="wide")

# --- IMPORTS MODERNES (LCEL) ---
# On n'utilise plus langchain.chains pour éviter votre erreur
try:
    from langchain_openai import OpenAIEmbeddings, ChatOpenAI
    from langchain_community.document_loaders import PyPDFLoader
    from langchain_community.vectorstores import FAISS
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.runnables import RunnablePassthrough
    from langchain_core.output_parsers import StrOutputParser
    
    print("✅ Système d'importation LCEL opérationnel.")
except ImportError as e:
    st.error(f"❌ Erreur d'importation : {e}")
    st.stop()

# --- INTERFACE ---
st.title("⚖️ Assistant Expert - Livre des Procédures Fiscales")
st.markdown("Analyse technique du LPF Edition 2026")

# --- INITIALISATION DE LA BASE (CACHE) ---
@st.cache_resource
def init_vector_db():
    # Vérification du fichier PDF
    pdf_name = "Livre des procédures fiscales.pdf"
    pdf_path = Path(__file__).parent / pdf_name
    
    if not pdf_path.exists():
        st.error(f"Fichier '{pdf_name}' non trouvé. Vérifiez son emplacement.")
        return None

    with st.status("Indexation du LPF en cours..."):
        loader = PyPDFLoader(str(pdf_path))
        docs = loader.load()
        
        # Découpage optimisé pour le droit fiscal
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
        chunks = splitter.split_documents(docs)
        
        # Création des vecteurs
        embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
        vectorstore = FAISS.from_documents(chunks, embeddings)
        return vectorstore

vector_db = init_vector_db()

# --- GESTION DU CHAT ---
if "messages" not in st.session_state:
    st.session_state.messages = []

# Affichage de l'historique
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Nouvelle saisie
if prompt := st.chat_input("Ex: Quel est le délai de reprise pour l'IS ?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    if vector_db:
        with st.chat_message("assistant"):
            with st.spinner("Analyse juridique en cours..."):
                llm = ChatOpenAI(model="gpt-4o", temperature=0)
                
                # Template de réponse expert
                template = """Vous êtes un assistant expert en droit fiscal français. 
                Utilisez les extraits du Livre des Procédures Fiscales (LPF) suivants pour répondre à la question.
                
                RÈGLES :
                1. Citez toujours l'article concerné (ex: Article L169).
                2. Soyez précis et technique.
                3. Si la réponse n'est pas dans le contexte, dites que vous ne savez pas.

                CONTEXTE :
                {context}

                QUESTION : 
                {question}

                RÉPONSE :"""
                
                rag_prompt = ChatPromptTemplate.from_template(template)

                # Fonction pour formater les documents récupérés
                def format_docs(docs):
                    return "\n\n".join(doc.page_content for doc in docs)

                # Construction de la chaîne RAG via LCEL (Robuste et moderne)
                retriever = vector_db.as_retriever(search_kwargs={"k": 5})
                
                rag_chain = (
                    {"context": retriever | format_docs, "question": RunnablePassthrough()}
                    | rag_prompt
                    | llm
                    | StrOutputParser()
                )
                
                try:
                    # Exécution
                    response = rag_chain.invoke(prompt)
                    st.markdown(response)
                    st.session_state.messages.append({"role": "assistant", "content": response})
                except Exception as e:
                    st.error(f"Une erreur est survenue lors de la génération : {e}")