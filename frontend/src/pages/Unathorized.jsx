import NavBar from "../compoenets/NavBar";

export default function Unathorized() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <NavBar />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="topbar">
          <div>
            <h1>Unathorized Menu</h1>
          </div>

        </header>

        <section className="projects-section">
          <h1>Sorry you don't have acces to this route</h1>
        </section>

      </main>
    </div>
  );
}