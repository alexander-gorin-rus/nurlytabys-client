import React from 'react'

export const Register = () => {
    return (
        <div className="container">
            <div className="col-12">
                <h3 className=" pt-4 text-danger text-center">Внимание! Зарегистрироваться могут только сотрудники компании</h3>
                <h5 className="text-center pt-5">Введите пароль</h5>
                <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" />     
            </div>
        </div>
    )
}

export default Register;
