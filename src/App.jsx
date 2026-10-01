import React, { useMemo, useState } from "react";

const initialComplaints = [
    {
        id: "CC-1001",
        studentName: "Aman",
        category: "Internet",
        title: "Wi-Fi not working in Lab 2",
        description: "No internet connection on three machines.",
        priority: "High",
        status: "Pending",
        location: "Lab 2"
    },
    {
        id: "CC-1002",
        studentName: "Priya",
        category: "Laptop",
        title: "Laptop not charging",
        description: "Charging indicator is not turning on.",
        priority: "Critical",
        status: "In Progress",
        location: "Lab 1"
    },
    {
        id: "CC-1003",
        studentName: "Ravi",
        category: "Classroom",
        title: "Projector not displaying",
        description: "Projector powers on but shows no image.",
        priority: "Medium",
        status: "Resolved",
        location: "Room 204"
    },
    {
        id: "CC-1004",
        studentName: "Neha",
        category: "Electricity",
        title: "Charging point damaged",
        description: "The socket near the last row is loose.",
        priority: "High",
        status: "Pending",
        location: "Study Hall"
    },
    {
        id: "CC-1005",
        studentName: "Kabir",
        category: "Account",
        title: "Cannot reset portal password",
        description: "Password reset email is not received.",
        priority: "Medium",
        status: "Resolved",
        location: "Online"
    }
];

function Navbar() {
    return (
        <header className="navbar">
            <div className="nav-inner">
                <div className="logo">
                    <span>CC</span>
                    CampusConnect
                </div>
                <nav>
                    <a href="#dashboard">Dashboard</a>
                    <a href="#complaints">Complaints</a>
                    <a href="#create">Create</a>
                </nav>
            </div>
        </header>
    );
}

function StatCard({ label, value, helper }) {
    return (
        <article className="stat-card">
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{helper}</small>
        </article>
    );
}

function Dashboard({ complaints }) {
    const counts = useMemo(() => {
        return {
            total: complaints.length,
            pending: complaints.filter((item) => item.status === "Pending").length,
            progress: complaints.filter((item) => item.status === "In Progress").length,
            resolved: complaints.filter((item) => item.status === "Resolved").length
        };
    }, [complaints]);

    return (
        <section id="dashboard" className="dashboard">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">STUDENT DASHBOARD</span>
                    <h1>Campus issue control center</h1>
                    <p>Track, search and manage reported campus issues.</p>
                </div>
            </div>

            <div className="stats-grid">
                <StatCard label="Total complaints" value={counts.total} helper="All reports" />
                <StatCard label="Pending" value={counts.pending} helper="Needs attention" />
                <StatCard label="In Progress" value={counts.progress} helper="Being worked on" />
                <StatCard label="Resolved" value={counts.resolved} helper="Completed" />
            </div>
        </section>
    );
}

function ComplaintForm({ onAdd }) {
    const [form, setForm] = useState({
        studentName: "",
        category: "",
        title: "",
        description: "",
        priority: "Medium",
        location: ""
    });

    const [message, setMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setForm((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!form.studentName.trim()) {
            setMessage("Please enter student name.");
            return;
        }

        if (!form.title.trim()) {
            setMessage("Please enter an issue title.");
            return;
        }

        if (!form.category) {
            setMessage("Please select a category.");
            return;
        }

        if (!form.description.trim()) {
            setMessage("Please describe the issue.");
            return;
        }

        onAdd({
            ...form,
            id: `CC-${Math.floor(1000 + Math.random() * 9000)}`,
            status: "Pending"
        });

        setMessage("Complaint added successfully.");
        setForm({
            studentName: "",
            category: "",
            title: "",
            description: "",
            priority: "Medium",
            location: ""
        });
    }

    return (
        <section id="create" className="create-section">
            <div className="section-title">
                <span className="eyebrow">NEW REPORT</span>
                <h2>Create a complaint</h2>
                <p>Use a clear title and useful description so the support team can act quickly.</p>
            </div>

            <form className="complaint-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <label>
                        Student name
                        <input
                            name="studentName"
                            value={form.studentName}
                            onChange={handleChange}
                            placeholder="e.g. Aman"
                        />
                    </label>

                    <label>
                        Category
                        <select name="category" value={form.category} onChange={handleChange}>
                            <option value="">Select category</option>
                            <option value="Internet">Internet</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Classroom">Classroom</option>
                            <option value="Electricity">Electricity</option>
                            <option value="Facilities">Facilities</option>
                            <option value="Account">Account</option>
                        </select>
                    </label>

                    <label>
                        Issue title
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Wi-Fi not working"
                        />
                    </label>

                    <label>
                        Location
                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Lab 2"
                        />
                    </label>

                    <label>
                        Priority
                        <select name="priority" value={form.priority} onChange={handleChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </label>

                    <label className="wide">
                        Description
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Explain what happened..."
                        />
                    </label>
                </div>

                {message && <div className="form-message">{message}</div>}

                <button className="primary-button" type="submit">
                    Submit Complaint
                </button>
            </form>
        </section>
    );
}

function SearchFilter({ search, setSearch, status, setStatus, category, setCategory }) {
    return (
        <div className="toolbar">
            <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title, student or ID..."
            />

            <select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="All">All statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
            </select>

            <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="All">All categories</option>
                <option value="Internet">Internet</option>
                <option value="Laptop">Laptop</option>
                <option value="Classroom">Classroom</option>
                <option value="Electricity">Electricity</option>
                <option value="Facilities">Facilities</option>
                <option value="Account">Account</option>
            </select>
        </div>
    );
}

function ComplaintCard({ complaint, onStatusChange, onDelete }) {
    const urgent = complaint.priority === "High" || complaint.priority === "Critical";

    return (
        <article className="complaint-card">
            <div className="complaint-top">
                <div>
                    <span className="complaint-id">{complaint.id}</span>
                    <h3>{complaint.title}</h3>
                </div>
                <span className={`status status-${complaint.status.toLowerCase().replace(" ", "-")}`}>
                    {complaint.status}
                </span>
            </div>

            <p className="description">{complaint.description}</p>

            <div className="meta-grid">
                <span><b>Student:</b> {complaint.studentName}</span>
                <span><b>Category:</b> {complaint.category}</span>
                <span><b>Location:</b> {complaint.location || "Not provided"}</span>
                <span><b>Priority:</b> {complaint.priority}</span>
            </div>

            {urgent && (
                <div className="urgent-note">
                    ⚠ This complaint requires quick attention.
                </div>
            )}

            <div className="card-actions">
                <select
                    value={complaint.status}
                    onChange={(event) => onStatusChange(complaint.id, event.target.value)}
                >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                </select>

                <button className="delete-button" onClick={() => onDelete(complaint.id)}>
                    Delete
                </button>
            </div>
        </article>
    );
}

function ComplaintList({ complaints, onStatusChange, onDelete }) {
    return (
        <section id="complaints" className="list-section">
            <div className="section-title">
                <span className="eyebrow">COMPLAINTS</span>
                <h2>Reported issues</h2>
            </div>

            {complaints.length === 0 ? (
                <div className="empty-state">
                    <h3>No complaints found</h3>
                    <p>Try changing your search or filters.</p>
                </div>
            ) : (
                <div className="complaint-list">
                    {complaints.map((complaint) => (
                        <ComplaintCard
                            key={complaint.id}
                            complaint={complaint}
                            onStatusChange={onStatusChange}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default function App() {
    const [complaints, setComplaints] = useState(initialComplaints);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [category, setCategory] = useState("All");

    function addComplaint(newComplaint) {
        setComplaints((previous) => [newComplaint, ...previous]);
    }

    function updateStatus(id, newStatus) {
        setComplaints((previous) =>
            previous.map((item) =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
    }

    function deleteComplaint(id) {
        setComplaints((previous) => previous.filter((item) => item.id !== id));
    }

    const filteredComplaints = useMemo(() => {
        const query = search.toLowerCase().trim();

        return complaints.filter((item) => {
            const matchesSearch =
                item.title.toLowerCase().includes(query) ||
                item.studentName.toLowerCase().includes(query) ||
                item.id.toLowerCase().includes(query);

            const matchesStatus = status === "All" || item.status === status;
            const matchesCategory = category === "All" || item.category === category;

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [complaints, search, status, category]);

    return (
        <>
            <Navbar />

            <main className="container">
                <Dashboard complaints={complaints} />

                <section className="filters-section">
                    <SearchFilter
                        search={search}
                        setSearch={setSearch}
                        status={status}
                        setStatus={setStatus}
                        category={category}
                        setCategory={setCategory}
                    />
                </section>

                <ComplaintList
                    complaints={filteredComplaints}
                    onStatusChange={updateStatus}
                    onDelete={deleteComplaint}
                />

                <ComplaintForm onAdd={addComplaint} />
            </main>

            <footer className="footer">
                CampusConnect React Learning Challenge · Phase 3 + Phase 4
            </footer>
        </>
    );
}
