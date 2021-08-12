import React from "react";
import { FaEdit, FaTrash, FaWindowClose } from "react-icons/fa";
const List = ({
	id,
	title,
	deleteItemOnClick,
	editItemOnClick,
	editing,
	handleChange,
	editId,
	handleSubmit,
	hideEdit,
	bud,
}) => {
	return (
		<>
			{editing && id === editId ? (
				<form className="grocery-form">
					<div className="form-control">
						<input
							type="text"
							className="grocery"
							placeholder="e.g. eggs"
							value={bud}
							onChange={handleChange}
						/>
						<button
							type="submit"
							className="submit-btn"
							onClick={handleSubmit}
						>
							edit
						</button>
						<button
							type="submit"
							className="submit-btn after-edit"
							onClick={hideEdit}
						>
							<FaWindowClose />
						</button>
					</div>
				</form>
			) : (
				<article className="grocery-item">
					<p className="title">{title}</p>
					<div className="btn-container">
						<button
							type="button"
							className="edit-btn"
							onClick={() => editItemOnClick(id)}
						>
							<FaEdit />
						</button>
						<button
							type="button"
							className="delete-btn"
							onClick={() => deleteItemOnClick(id)}
						>
							<FaTrash />
						</button>
					</div>
				</article>
			)}
		</>
	);
};

export default List;
