import { useForm, Form } from "react-hook-form"
import axios from "axios"


function SignupPage() {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:5000/users/register", data)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    return (
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" {...register("username")} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" {...register("email")} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" {...register("password")} />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="passwordConfirm" {...register("passwordConfirm")} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignupPage