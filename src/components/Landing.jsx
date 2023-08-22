import { Link } from 'react-router-dom';
function Landing() {
    const users = [
        { name: 'Mana', color: 'blue', id: 1 },
        { name: 'Jasmyne', color: 'red', id: 2 },
        { name: 'Aura', color: 'yellow', id: 3 },
        { name: 'Tina', color: 'green', id: 4 }
    ];
    return (
        <div className={"landing"}>
            <h1>Who's watching?</h1>
                <div className={"users"}>
                {users.map((user, index) => (
                    <Link key={index} to={`/catalog/${user.id}`}>
                        <div style={{ backgroundColor: user.color }} className={"user"}>{user.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default Landing;
