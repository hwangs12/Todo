import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
	const [bud, setBud] = useState("");
	const [list, setList] = useState([]);
	const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
	const [editing, setEditing] = useState(false);
	const [editId, setEditId] = useState(null);

	const handleChange = (e) => {
		setBud(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!bud) {
			showAlert(true, "danger", "please submit valid input");
		} else if (bud && editing) {
			setList(
				list.map((item) => {
					if (item.id === editId) {
						return { ...item, title: bud };
					}
					return item;
				})
			);
			showAlert(true, "success", "an item has been edited");
			setEditing(false);
			setBud("");
		} else {
			const newItem = { id: new Date().getTime(), title: bud };
			setList([...list, newItem]);
			showAlert(true, "success", "an item has been added");
			setBud("");
		}
	};

	const deleteListOnClick = () => {
		setList([]);
		showAlert(true, "danger", "items have been cleared");
	};

	const deleteItemOnClick = (id) => {
		const newList = list.filter((item) => item.id !== id);
		setList(newList);
		showAlert(true, "danger", "an item has been deleted");
	};

	const showAlert = (show = false, type = "", msg = "") => {
		setAlert({ show, type, msg });
	};

	const editItemOnClick = (id) => {
		setEditing(true);
		const budFound = list.find((item) => item.id === id);
		setEditId(id);
		setBud(budFound.title);
	};

	const hideEdit = (e) => {
		e.preventDefault();
		setEditing(false);
		showAlert(true, "danger", "the edit has been cancelled");
		setBud("");
	};

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("list"));
		if (data) {
			setList(data);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("list", JSON.stringify(list));
	}, [list]);

	return (
		<section className="section-center">
			{alert.show && <Alert {...alert} showAlert={showAlert} />}
			<form action="" className="grocery-form" onSubmit={handleSubmit}>
				<h3>things to do today</h3>
				{/* {!editing && ( */}
				<div className="form-control">
					<input
						type="text"
						className="grocery"
						placeholder="e.g. eggs"
						value={editing ? "editing..." : bud}
						onChange={handleChange}
						disabled={editing}
					/>
					<button type="submit" className="submit-btn">
						submit
					</button>
				</div>
				{/* )} */}
			</form>
			<div className="grocery-container">
				<div className="grocery-list">
					{list.map((item) => {
						return (
							<List
								key={item.id}
								{...item}
								deleteItemOnClick={deleteItemOnClick}
								editItemOnClick={editItemOnClick}
								editing={editing}
								editId={editId}
								handleChange={handleChange}
								handleSubmit={handleSubmit}
								hideEdit={hideEdit}
								bud={bud}
							/>
						);
					})}
				</div>
				{list.length > 0 && (
					<button className="clear-btn" onClick={deleteListOnClick}>
						clear items
					</button>
				)}
			</div>
		</section>
	);
}

export default App;
