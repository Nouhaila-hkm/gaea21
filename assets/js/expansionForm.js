import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../styles/createforms.scss';
import Expansion from './components/expansion/Expansion';

function App() {
    const gaeaUserId = document.querySelector('.expansionForm').dataset.gaeaUserId;
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);
    const [gaeaUser, setGaeaUser] = React.useState(null);
    const inputHidden = document.getElementById('urlEnv');

   /*useEffect(() => {
        const apiUrl = inputHidden.dataset.urlapi;
        fetch(apiUrl + '/apictrl/getUser/' + gaeaUserId)
            .then(response => response.json())
            .then(data => {
                    setGaeaUser(data);
                }
            );

    }, []);*/

    useEffect(() => {
        const apiUrl = inputHidden.dataset.urlapi;

        fetch(apiUrl + '/apictrl/getUser/' + gaeaUserId)
            .then(response => response.json())
            .then(dataGaea => {
                fetch(apiUrl + '/apictrl/getUser/' + gaeaUserId + '/gaea21')
                    .then(response => response.json())
                    .then(data => {
                        setUser({
                            "gaeauserid": gaeaUserId,
                            "username": dataGaea.username,
                            "email": dataGaea.email,
                            "password": "",
                            "roles": data.roles ? data.roles : [],
                            "birthDay": data.birthday ? data.birthday : "",
                            "nationality": data.nationality ? data.nationality : "",
                            "firstName": data.firstname ? data.firstname : "",
                            "lastName": data.lastname ? data.lastname : "",
                            "adress": data.street ? data.street : "",
                            "additionalAdress": data.additionalStreet ? data.additionalStreet : "",
                            "city": data.city ? data.city : "",
                            "zipCode": data.postcode ? data.postcode : "",
                            "country": data.country ? data.country : "",
                            "phone": data.phone ? data.phone : "",
                        });
                        setLoading(false);
                        console.log(data);
                    });
            }
        );
    }, []);

    return (
        <>
            {loading ? <div>Loading...</div> : <Expansion user={user}/>}
        </>
    );
}

ReactDOM.render(
    <App/>, document.querySelector('.expansionForm'));
