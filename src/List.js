import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ budList, deleteAllOnClick, deleteOnClick, editOnClick }) => {
	return (
		<div className="grocery-container">
			<div className="grocery-list">
				{budList.map((bud) => {
					return (
						<article key={bud.id} className="grocery-item">
							<p className="title">{bud.title}</p>
							<div className="btn-container">
								<button
									type="button"
									className="edit-btn"
									onClick={() => editOnClick(bud.id)}
								>
									<FaEdit />
								</button>
								<button
									type="button"
									className="delete-btn"
									onClick={() => deleteOnClick(bud.id)}
								>
									<FaTrash />
								</button>
							</div>
						</article>
					);
				})}
			</div>
			{budList.length > 0 && (
				<button className="clear-btn" onClick={deleteAllOnClick}>
					clear items
				</button>
			)}
		</div>
	);
};

export default List;
