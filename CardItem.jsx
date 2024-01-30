import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const CardItem = ({ data, handleDragging, handleDeleteItem, handleEditUser }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text", `${data.id}`);
    handleDragging(true);
  };

  const handleDragEnd = () => handleDragging(false);

  const handleEdit = () => {
  
    handleEditUser(data);
  };

  const handleDelete = () => {

    handleDeleteItem(data.id);
  };



  console.log("card ITEM", data);
  return (
    <div
      className="card-container"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <p>{data.username}</p>
      <p>{data.email}</p>
      <p>{data.phonenumber}</p>
      <p>{data.age}</p>
      <div className="card-icons">
        <button type="button" onClick={() => handleEdit(data.id)}>
          <EditIcon />
        </button>
        <button type="button" onClick={() => handleDelete(data.id)}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default CardItem;