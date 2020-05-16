import React, { useState } from "react";
import { axiosWithAuth } from '../Axios/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log('tar', colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState({
    color: '',
    code: { hex: '' },
    id: Date.now()
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(() => {
      axiosWithAuth()
      .get(`colors`)
      .then(response => updateColors(response.data))
      .catch(error => console.log(error));
      setEditing(false) 
    })
    .catch(err => console.log(err))
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(() => {
      axiosWithAuth()
          .get("/colors")
          .then(response => updateColors(response.data))
          .catch(error => console.log(error));
        setEditing(false);
      })
    .catch(err => console.log(err))
  };


  const handleChange = e => {
    e.preventDefault();
    setAddColor({
      ...addColor,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post(`/colors`, addColor)
    .then(() =>{
      axiosWithAuth()
      .get(`colors`)
      .then(response => updateColors(response.data))
      .catch(error => console.log(error));
      setEditing(false)
    })
    .catch(error => console.log(error));
  }

  return (
    <div className="colors-wrap">
      
      <form onSubmit={handleSubmit}>
        <h3>Add A New Color</h3>
        <label>Color Name:
          <input
            name='color name' 
            type='text' 
            values={addColor.color} 
            onChange={handleChange} 
            placeholder='Color Name'
          />
        </label>
        <label>Hex Code
          <input
            name='hex name' 
            type='text' 
            values={addColor.code.hex} 
            onChange={handleChange} 
            placeholder='Hex Code'
          />
        </label>
        <button type='submit'>Add Color</button>
      </form>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;
