export default function Header({title, description, button}) {
    return (
        <header className="topbar">
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            {button}
        </header>
    );
}