import React, {useState ,useEffect } from 'react'
import "./style.css";

const Todo = () => {

    const getLocalStorage = () =>{
        const lists = localStorage.getItem("mytodoList");

        if(lists){
            return JSON.parse(lists)
        }
        else{
            return [];
        }
    }

    const [inputdata,setInputData] = useState("");
    const [items , setItems] = useState(getLocalStorage());
    const [isEditItem , setIsEditItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false);

    const addItem = () =>{
        if(!inputdata) {
            alert("Enter Data")
        }
        else if(inputdata && toggleButton){
            setItems(
                items.map((curElem) =>{
                   if(curElem.id === isEditItem){
                        return {...curElem,name:inputdata}
                   }
                   return curElem;
                })

            )
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }
        
        else{
            const myNewInputData = {
                id : new Date().getTime().toString(),
                name :inputdata
            }

            setItems([...items, myNewInputData]);    
            setInputData("");
        }
    }

    const deleteItem = (index) =>{
        const updatedItems = items.filter((curElem) =>{
            return curElem.id !== index;
        })
        setItems(updatedItems);
    }

    const removeAll = () =>{
        setItems([])
    }

    useEffect(() =>{
        localStorage.setItem("mytodoList", JSON.stringify(items))
    }, [items]);


    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
          return curElem.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
      };

  return (
    <>
        {/* add item */}
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src='./images/todo.svg' alt='todologo'></img>
                    <figcaption>Add your List </figcaption>
                </figure>
                <div className='addItems'>
                    <input type="text" placeholder='✍️ Add item' className='form-control'
                    value={inputdata} onChange={(event) => setInputData(event.target.value)}
                    ></input>
                    {
                        toggleButton ? <i className='far fa-edit add-btn' onClick={addItem}></i> : 
                        <i className='fa fa-plus add-btn' onClick={addItem}></i>
                    }
                </div>

                {/* show our items */}

                <div className='showItems'>
                    {items.map((curElem,index) =>{
                        return (
                            <div className='eachItem' key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className='todo-btn'>
                                <i className='far fa-edit add-btn' onClick={() => editItem(curElem.id)}></i>
                                <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(curElem.id)}></i>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* button */}

                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                        <span>CHECK LIST</span>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo