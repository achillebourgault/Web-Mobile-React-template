export async function login(user)
{
    fetch("http://localhost:8080/users/login", {
        method: "POST",
        body: JSON.stringify(
            {
                "email": user.email,
                "password": user.password
            },),
        headers: {
            'X-User-Agent' : 'area / 1.0.0 comment',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },

    })
        .then((response) => response.text())
        .then((quote) => {
            console.log(quote)
            const datas = JSON.parse(quote);
            if (datas.status === "connected") {
                console.log("L'user est login")
                this.props.history.push('/profile');
            }
        });
}

export async function register(user)
{
    fetch("http://localhost:8080/users/create", {
        mode: 'no-cors',
        method: "POST",
        body: JSON.stringify(
            {
                "username": user.name,
                "email": user.email,
                "password": user.password
            },),
        headers: {
            'X-User-Agent' : 'area / 1.0.0 comment',
            'Content-Type': 'application/json',
        },

    })
        .then((response) => response.text())
        .then((quote) => {
            console.log(quote)
            const datas = JSON.parse(quote);
            if (datas.status === "connected") {
                this.setState({userid: datas.uuid})
                this.props.history.push('/profile');
            }
        });
}

export const isLoggedIn = () => {
    return localStorage.getItem("usertoken") !== null;
}