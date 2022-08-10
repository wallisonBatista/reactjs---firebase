import { useState, useEffect } from 'react'
import { db } from './firebaseConnection'
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import './App.css'

function App() {

    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [idPost, setIdPost] = useState('');

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function loadPosts() {
            const unsub = onSnapshot(collection(db, "reactjs"), (snapshot) => {
                let listaPost = [];

                snapshot.forEach((doc) => {
                    listaPost.push({
                        id: doc.id,
                        titulo: doc.data().titulo,
                        autor: doc.data().autor
                    })
                })

                setPosts(listaPost);
            })
        }

        loadPosts();
    }, [])

    async function handleAdd() {
        await addDoc(collection(db, "reactjs"), {
            titulo: titulo,
            autor: autor
        })
            .then(() => {
                console.log("cadastrado com sucesso!")
                setAutor('')
                setTitulo('')
            })
            .catch((error) => {
                console.log(`gerou erro ${error}`)
            })
    }

    async function buscarPost() {
        const postsRef = collection(db, "reactjs")
        await getDocs(postsRef)
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        titulo: doc.data().titulo,
                        autor: doc.data().autor
                    })
                })

                setPosts(lista);
            })
            .catch((error) => {
                console.log("deu algum erro ao buscar")
            })
    }

    async function editarPost() {
        const docRef = doc(db, "reactjs", idPost)

        await updateDoc(docRef, {
            titulo: titulo,
            autor: autor
        })
            .then(() => {
                console.log("atualizado")
                setIdPost('')
                setTitulo('')
                setAutor('')
            })
            .catch((error) => {
                console.log("erro ao atualizar")
            })
    }

    async function excluirPost(id) {
        const docRef = doc(db, "reactjs", id)

        await deleteDoc(docRef)

            .then(() => {
                console.log("post deletado!")
            })
    }

    return (
        <div>
            <h1>Firebase</h1>
            <div className="container">
                <label>ID do Post: </label>
                <input
                    placeholder="Digite ID do post"
                    value={idPost}
                    onChange={(e) => setIdPost(e.target.value)}
                /> <br />

                <label>Título: </label>
                <textarea
                    type="text"
                    placeholder='Digite o título'
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />

                <label>Author: </label>
                <input
                    type="text"
                    placeholder="autor do post"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                />

                <button onClick={handleAdd}>Cadastrar</button>
                <button onClick={buscarPost}>Buscar Post</button>
                <button onClick={editarPost}>Atualizar Post</button>

                <ul>
                    {posts.map((post) => {
                        return (
                            <li key={post.id}>
                                <strong>ID: {post.id}</strong> <br />
                                <span>Titulo: {post.titulo}</span> <br />
                                <span>Autor: {post.autor}</span> <br />
                                <button onClick={() => excluirPost(post.id)} >Excluir</button>
                            </li>
                        )
                    })}
                </ul>

            </div>
        </div>
    );
}

export default App;
