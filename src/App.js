import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
	let list = localStorage.getItem("list");
	if (list) {
		return JSON.parse(localStorage.getItem("list"));
	} else {
		return [];
	}
};

function App() {
	const [bud, setBud] = useState("");
	const [budList, setBudList] = useState(getLocalStorage());
	const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
	const [edit, setEdit] = useState(false);
	const [editId, setEditId] = useState(null);

	const handleChange = (e) => {
		setBud(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!bud) {
			setAlert({ show: true, type: "danger", msg: "please enter value" });
		} else if (bud && edit) {
			setBudList(
				budList.map((item) => {
					if (item.id === editId) {
						return { ...item, title: bud };
					}
					return item;
				})
			);
			showAlert(true, "success", "item has been edited");
			setBud("");
		} else {
			const newItem = { id: new Date().getTime().toString(), title: bud };
			setBudList([...budList, newItem]);
			showAlert(true, "success", "item added to the list");
			setBud("");
		}
	};

	const deleteAllOnClick = () => {
		setBudList([]);
		showAlert(true, "danger", "empty list");
	};

	const deleteOnClick = (id) => {
		const newList = budList.filter((bud) => {
			return bud.id !== id;
		});
		setBudList(newList);
		showAlert(true, "danger", "item deleted");
	};

	const showAlert = (show = false, type = "", msg = "") => {
		setAlert({ show, type, msg });
	};

	const editOnClick = (id) => {
		const editItem = budList.find((bud) => bud.id === id);
		console.log(editItem);
		setEdit(true);
		setEditId(id);
		setBud(editItem.title);
	};

	useEffect(() => {
		localStorage.setItem("list", JSON.stringify(budList));
	}, [budList]);

	// const editOnClick = (id) => {
	// 	setBud({ id: id, title: e.target.value });
	// };

	return (
		<section className="section-center">
			{alert.show && (
				<Alert {...alert} budList={budList} showAlert={showAlert} />
			)}
			<form className="grocery-form" onSubmit={handleSubmit}>
				<h3>grocery bud</h3>
				<div className="form-control">
					<input
						type="text"
						placeholder="e.g. eggs"
						className="grocery"
						value={bud}
						onChange={handleChange}
					/>
					<button type="submit" className="submit-btn">
						submit
					</button>
				</div>
			</form>
			<List
				budList={budList}
				handleChange={handleChange}
				deleteAllOnClick={deleteAllOnClick}
				deleteOnClick={deleteOnClick}
				editOnClick={editOnClick}
				edit={edit}
			/>
		</section>
	);
}

export default App;
