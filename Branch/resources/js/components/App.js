import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { method } from 'lodash';

import '../components/app.css';
function App() {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json',
            { method: 'get' }).then((response => response.json())).then(statesJson => setStates(statesJson)).catch(err => console.log(err));
    }, [])
    const onSubmit = (event) => {
        var form = document.getElementById("needs-validation");
        if (form.checkValidity() === false) {
            form.classList.add('was-validated');
            event.preventDefault();
            event.stopPropagation();
        } else {
            const data = new URLSearchParams();
            for (const pair of new FormData(form)) {
                if (pair[0] == "state") {
                    data.append(pair[0], states[pair[1]].departamento);
                } else {
                    data.append(pair[0], pair[1]);
                }
            }
            console.log(data);
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf_token"]').content,
                },
                body: data,
            }).then(response => response.text()).then(done => {
                console.log(done);
                if (done == "1") {
                    window.$('#modal-done').modal('show');
                } else {
                    window.$('#modal-error').modal('show');
                }
            }).catch(err => {
                console.log(err);
                window.$('#modal-error').modal('show');
            });
        }

    }
    return (
        <div className="container">
            <div className="row centeredContent" style={{ marginTop: 40 }}>
                <img src="https://sigma-studios.s3-us-west-2.amazonaws.com/test/sigma-logo.png" style={{ width: 164 }} />
            </div>
            <div className="row centeredContent">
                <h1 style={{ fontWeight: 'bold', fontSize: 30, marginTop: 20 }}>Prueba de desarrollo Sigma</h1>
            </div>
            <div className="row centeredContent" >
                <span style={{ marginTop: 10, fontWeight: 600, width: '75%', color: '#999' }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </span>
            </div>
            <div className="row" style={{ marginTop: 50, }}>
                <div className="col-12 col-md-6">
                    <img src="https://sigma-studios.s3-us-west-2.amazonaws.com/test/sigma-image.png" className="image" />
                </div>
                <div className="col-12 col-md-6 centeredContent">
                    <form className="form-group containerForm" id="needs-validation" enctype="multipart/form-data">
                        <div className="form-row">
                            <label>Departamento*</label>
                            <select name="state" className="form-control" required onChange={(e) => { setCities(states[e.target.value].ciudades) }}>
                                <option value="" disabled selected>Seleccione un departamento</option>
                                {states.map((state, index) => {
                                    return <option value={index}>{state.departamento}</option>
                                })}
                            </select>
                            <div className="invalid-feedback">
                                Por favor seleccione un departamento
                        </div>
                        </div>
                        <div className="form-row" id="city-container">
                            <label>Ciudad*</label>
                            <select name="city" className="form-control" required   >
                                {cities.length <= 0 ? <option value="">Seleccione un departamento primero</option> : ''}
                                {cities.map((city, index) => {
                                    return <option value={city}>{city}</option>
                                })}
                            </select>
                            <div className="invalid-feedback">
                                Por favor seleccione una ciudad
                        </div>
                        </div>

                        <div className="form-row">
                            <label>Nombre*</label>
                            <input name="name" type="text" className="form-control" required placeholder="Pepito de Jesús" maxLength="50" />
                            <div className="invalid-feedback">
                                Por favor ingresa un nombre, este debe tener menos de 50 caracteres
                        </div>
                        </div>
                        <div className="form-row">
                            <label>Correo*</label>
                            <input name="email" type="email" className="form-control" required placeholder="pepitodejesus@gmail.com" maxLength="50" />
                            <div className="invalid-feedback">
                                Por favor ingresa un correo valido, este debe tener menos de 50 caracteres
                        </div>
                        </div>
                        <div className="form-row centeredContent" style={{ marginTop: 20 }}>
                            <button type="button" className="buttonSubmit centeredContent" onClick={
                                (e) => {
                                    onSubmit(e);
                                }}>ENVIAR</button>
                        </div>
                    </form>
                </div>
            </div >
            <div class="modal fade" id="modal-done" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Exito</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <span>Hemos guardado tus datos con exito</span>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="modal-error" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">¡Algo ha fallado!</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <span>Lo sentimos, tus datos no fueron guardados, por favor intentalo más tarde</span>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
