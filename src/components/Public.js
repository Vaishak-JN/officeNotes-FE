import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header class="login-header">
                <h1>Welcome to <span className="nowrap">OfficeNotes!</span></h1>
                <Link to="/login">Login</Link>
            </header>
            <main className="public__main">
                <p>This is MERN stack app with CRUD, authentication and Protected-Routes functionalities that allows you to assign notes to different users.</p>
                <p>There are 3 types of users: Admin, Manager and Employee.</p>
                <p>The notes features are role based.</p>
                <p> Mangers can create,read,update and delete notes and users. </p>
                <p>While employees can only read notes assigned to them. Although they can create notes and assign it to another user</p>

                <br />
                <h3>Login credentials</h3>
                <p><strong>Manager</strong> (username): <strong>manager123</strong> (password)</p>
                <p><strong>Employee</strong> (username): <strong>employee123</strong> (password)</p>

            </main>
            <footer>
                <Link to="/login">Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public