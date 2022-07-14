import React from "react";
import { firebase } from "./Components/firebase";

function App() {
  const [tarea, setTarea] = React.useState([]);
  const [task, setTask] = React.useState("");
  const [modoEdicion,setEdicion ]= React.useState(false);
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    const agregarDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("tareas").get();
        console.log(data.docs);
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(arrayData);
        setTarea(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    agregarDatos();
  }, [])

  const agregar = async (e) => {
    e.preventDefault();
    if (!task.trim("")) {
      console.log("tarea vacia, por favor");
      return;
    }
    console.log(task);

    try {
      const db = firebase.firestore();
      const nuevaTarea = {
        name: task,
        fecha: Date.now(),
      };
      const data = await db.collection("tareas").add(nuevaTarea);
      setTarea([...tarea, { ...nuevaTarea, id: data.id }]);
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };
  const eliminar = async(id)=>{
    try {
      const db = firebase.firestore();
       await db.collection("tareas").doc(id).delete()
      const arrayFiltrado= tarea.filter(item=> item.id  !==id)
      setTarea(arrayFiltrado)
    } catch (error) {
      console.log(error)
    }
  };

  
  const editarOn= (item)=>{
    console.log('editar')
    setEdicion(true)
    setTask(item.name)
    setId(item.id)
  }
  const editar= async(e)=>{
    e.preventDefault()
    
    if (!task.trim("")) {
      console.log("tarea vacia, por favor");
      return;
    }
    try {
      const db = firebase.firestore();
      await db.collection("tareas").doc(id).update({
        name:task
      })
      const arrayEditado= tarea.map(item=>(
        item.id === id ? { id: item.id , fecha: item.fecha, name:task}: item
      ))
      setTarea(arrayEditado)
      setEdicion(false)
      setTask('')
    } catch (error) {
      console.log(error)
    }
  }
  

  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {tarea.map((item) => (
              <li className="list-group-item" key={item.id}>
                Lista tareas : {item.name}
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn btn-danger me-md-2" onClick={()=>eliminar(item.id)}>
                    Eliminar
                  </button>
                  <button className="btn btn-warning me-md-2"
                   onClick={()=> editarOn(item)}>
                    Editar 
                  </button>
                </div>
              </li>
            ))}
           
          </ul>
        </div>
        <div className="col-md-6">
          <h3>
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h3>
          <form onSubmit={modoEdicion? editar: agregar}>
            <input
              type="text"
              placeholder="Ingrese tarea"
              className="form-control mb-2"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            <div className="d-grid gap-2">

            <button className={modoEdicion? "btn btn-warning" : "btn btn-dark"} type="submit">
              {
                modoEdicion ?  'Edicion' : 'Agregar'
              }
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
