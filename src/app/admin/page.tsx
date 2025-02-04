"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import * as XLSX from "xlsx";
import "./admin.css";

const availableEvents = [
    "Xcoders", "Coin Quest", "Algo Rythms", "Caseathon", 
    "Reverse Coding", "Virtuso", "Thesis Precized", "Flip It Quiz It"
];

const AdminPage: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState("registeredEvents");
    const [selectedEvent, setSelectedEvent] = useState<string>("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                try {
                    const usersCollection = collection(db, "users");
                    const q = query(usersCollection, where("uid", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const userData = querySnapshot.docs[0].data();
                        setIsAdmin(userData.isAdmin || false);
                    } else {
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error("Error checking admin status:", error);
                    setIsAdmin(false);
                }
            } else {
                router.push("/auth/login"); // Redirect if not logged in
            }
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (isAdmin) {
            const fetchUsers = async () => {
                try {
                    const usersCollection = collection(db, "users");
                    const q = query(usersCollection);
                    const querySnapshot = await getDocs(q);
                    const data = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setUsers(data);
                } catch (error) {
                    console.error("Error fetching users:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUsers();
        }
    }, [isAdmin]);

    if (isAdmin === null) return <p className="loading_screen">Checking admin permissions...</p>;

    if (!isAdmin) {
        router.push("/");
        return null;
    }

    // Sorting & Filtering Logic
    let filteredUsers = [...users];

    if (selectedEvent) {
        const normalizedSelectedEvent = selectedEvent.trim().toLowerCase().replace(/[^a-z0-9]/gi, "");
    
        filteredUsers = filteredUsers.filter(user =>
            user.registeredEvents?.some((event: any) => {
                const normalizedEventName = event?.name?.trim().toLowerCase().replace(/[^a-z0-9]/gi, "");
                return normalizedEventName === normalizedSelectedEvent;
            })
        );
    }

    filteredUsers.sort((a, b) => {
        if (sortField === "registeredEvents") {
            return (b.registeredEvents?.length || 0) - (a.registeredEvents?.length || 0);
        } else if (sortField === "name") {
            return (a.name || "").localeCompare(b.name || "");
        } else if (sortField === "collegeName") {
            return (a.collegeName || "").localeCompare(b.collegeName || "");
        }
        return 0;
    });

    // Export to Excel
    const handleDownloadExcel = () => {
        const exportData = filteredUsers.map((user) => ({
            Name: user.name || "N/A",
            Email: user.email || "N/A",
            "Contact No": user.contactNo || "N/A",
            College: user.collegeName || "N/A",
            Department: user.department || "N/A",
            "Registered Events": user.registeredEvents
                ? user.registeredEvents.map((event: any) => event.name).join(", ")
                : "None",
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, "users_data.xlsx");
    };

    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>
            <div className="admin-actions">
                <div className="sort-options">
                    <label>Sort by:</label>
                    <select onChange={(e) => setSortField(e.target.value)}>
                        <option value="registeredEvents">Total Events Registered</option>
                        <option value="name">Name</option>
                        <option value="collegeName">College</option>
                    </select>
                    <div className="event-filter" style={{ marginLeft: "20px" }}>
                    <label>Filter by Event:</label>
                    <select onChange={(e) => setSelectedEvent(e.target.value)}>
                        <option value="">All Events</option>
                        {availableEvents.map(event => (
                            <option key={event} value={event}>{event}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleDownloadExcel} className="download-btn" style={{ marginLeft: "20px" }}>
                    Download Excel
                </button>
                </div>

            </div>
            {loading ? (
                <p className="loading-text">Loading users...</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact No</th>
                            <th>College</th>
                            <th>Department</th>
                            <th>Registered Events</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name || "N/A"}</td>
                                <td>{user.email || "N/A"}</td>
                                <td>{user.contactNo || "N/A"}</td>
                                <td>{user.collegeName || "N/A"}</td>
                                <td>{user.department || "N/A"}</td>
                                <td>
                                    {user.registeredEvents?.length > 0 ? (
                                        
                                            user.registeredEvents.map((event: any, index: number) => (
                                                <p key={index}>{event.name},</p>
                                            ))
                                        
                                    ) : (
                                        "None"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPage;
