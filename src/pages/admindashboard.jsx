import GetSession from "../utils/session";

function sessionCheck() {
return(
  <GetSession/>
)}

sessionCheck()


export default function AdminDashboard() {
    return (
        <>
        <div className="admindashboard">
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>
            <p>Here you can manage users, view reports, and more.</p>
        </div>
        </>
    );
}