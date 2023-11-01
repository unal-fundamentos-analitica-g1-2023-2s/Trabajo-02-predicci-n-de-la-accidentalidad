function validarFechas() {
  const fechaInicio = new Date(document.forms[0].fechaInicio.value);
  const fechaFin = new Date(document.forms[0].fechaFin.value);
  const fechaMin = new Date('2015-01-01');
  const fechaMax = new Date('2019-12-31');
  console.log(fechaInicio ,fechaMin , fechaFin , fechaMax)
  if (fechaInicio < fechaMin
    || fechaFin > fechaMax
    || fechaInicio > fechaFin
    || isNaN(fechaInicio)
    || isNaN(fechaFin)
  ) {
    alert('Las fechas no están dentro del rango válido.');
    return false;
  }

  // Continuar con la lógica para obtener los datos
  return true;
}


function obtenerDatos(event) {
  event.preventDefault();

  const canProcess = validarFechas()

  if (!canProcess) {
    return
  }

  const fechaInicio = new Date(document.getElementById('fechaInicio').value);
  const fechaFin = new Date(document.getElementById('fechaFin').value);

  // Lógica para cargar y procesar datos del CSV
  const urlCSV = 'csv/df_analysis.csv';
  console.log(urlCSV)
  fetch(urlCSV)
    .then(response => response.text())
    .then(data => {
      const lineas = data.split('\n');
      const resultados = [];

      for (let i = 1; i < lineas.length; i++) {
        const campos = lineas[i].split(',');
        const fecha = new Date(campos[0]);
        const muertos = parseInt(campos[1]);
        const heridos = parseInt(campos[2]);
        const atropellos = parseInt(campos[3]);

        if (fecha >= fechaInicio && fecha <= fechaFin) {
          resultados.push({ fecha, muertos, heridos, atropellos });
        }
      }

      console.log('cantidad de datos encontrados: ', resultados.length);

      mostrarResultados(resultados);
    })
    .catch(error => console.error(error));
}

function mostrarResultados(datos) {
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = '';

  if (datos.length === 0) {
    resultadosDiv.innerHTML = 'No se encontraron datos para la fecha seleccionada.';
  } else {
    const tabla = document.createElement('table');
    tabla.classList.add('result-table');

    // Crear encabezado de la tabla
    const encabezado = document.createElement('thead');
    const encabezadoFila = document.createElement('tr');
    encabezadoFila.innerHTML = '<th>Fecha</th><th>Muertos</th><th>Heridos</th><th>Atropellos</th>';
    encabezado.appendChild(encabezadoFila);
    tabla.appendChild(encabezado);

    // Crear filas de datos
    const cuerpoTabla = document.createElement('tbody');
    for (const dato of datos) {
      const fila = document.createElement('tr');
      fila.innerHTML = `<td>${dato.fecha.toJSON().split('T')[0]}</td><td>${dato.muertos}</td><td>${dato.heridos}</td><td>${dato.atropellos}</td>`;
      cuerpoTabla.appendChild(fila);
    }
    tabla.appendChild(cuerpoTabla);

    resultadosDiv.appendChild(tabla);
  }
}