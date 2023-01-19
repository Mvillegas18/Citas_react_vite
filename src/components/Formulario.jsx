import {useState ,useEffect} from 'react';
import Error from "./Error";


const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setemail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  
  const [error, setError] = useState(false);

  useEffect(()=>{
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setemail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  },[paciente])


  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    

    //Validacion del formulario

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('Hay al menos un campo vacio');

      setError(true);
      return;
    }

    setError(false);

    //Objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      id: generarId(),
    }

    if (paciente.id) {
      //Editando el registro
      objetoPaciente.id = paciente.id; 
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);

      setPacientes(pacientesActualizados )
      setPaciente({})
    }else {
      //Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente])
    }

    // Reiniciar el form
    setNombre('');
    setPropietario('');
    setemail('');
    setFecha('');
    setSintomas('');
  }


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">

      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="mt-5 text-xl text-center mb-10">Añade pacientes y {' '} <span className="text-indigo-700 font-bold ">Administralos</span></p>

      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded-xl py-10 px-5 mb-10">
        
        {error && <Error>'Todos los campos son obligatorios'</Error>}

        <div className="mb-5">
          <label htmlFor="mascota" className="block text-black uppercase font-bold">
            Nombre Mascota
          </label>
          <input 
            className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md" 
            id="mascota" 
            type="text" 
            placeholder="Nombre de la Mascota"
            value={nombre}
            onChange = {(e) => setNombre(e.target.value)}/>           
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-black uppercase font-bold">
            Nombre Propietario
          </label>
          <input 
            className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md" 
            id="propietario" 
            type="text" 
            placeholder="Nombre del Propietario"
            value={propietario}
            onChange = {(e) => setPropietario(e.target.value)}/>
      </div>

        <div>
          <label htmlFor="email" className="block text-black uppercase font-bold">
            Email
          </label>
          <input 
            className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md" 
            id="email" 
            type="email" 
            placeholder="Email Contacto Propietario"
            value={email}
            onChange = {(e) => setemail(e.target.value)}/>
      </div>

      
      <div>
          <label htmlFor="date" className="block text-black uppercase font-bold">
            Alta
          </label>
          <input 
            className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md" 
            id="date" 
            type="date" 
            value={fecha}
            onChange = {(e) => setFecha(e.target.value)}/>
      </div>

      <div>
          <label htmlFor="Sintomas" className="block text-black uppercase font-bold">
            Sintomas
          </label>
          <textarea 
            name="" 
            id="Sintomas" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md"
            cols="30" 
            rows="10"
            placeholder="Describe los sintomas"
            maxLength="1000px"
            value={sintomas}
            onChange = {(e) => setSintomas(e.target.value)}/>
      </div>
      <input type="submit" 
      className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
      value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
      />

      </form>

    </div>
  )
}
export default Formulario;