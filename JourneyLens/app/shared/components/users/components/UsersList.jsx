import style from "./style.module.css";
import { UserCard } from "./UserCard.jsx";

function UsersList(props) {
	if (props.listOfUsers === undefined) {
		return (
			<h4 className="mt-40 absolute-center">
				Backend server is down
			</h4>
		);
	}
	if (props.listOfUsers.length === 0) {
		return <div></div>;
	}

	const renderedListOfUsers = props.listOfUsers.FullListOfUsers.map(
		(user) => {
			return (
				<UserCard
					key={user.uuid}
					{...user}
				/>
			);
		},
	);

	return (
		<div className={style.contentContainer}>
			<ul className={style.cardContainer}>
				{renderedListOfUsers}
			</ul>
		</div>
	);
}

export default UsersList;
