function cambiarTipoRango() {
  const tipoRango = document.getElementById('tipoRango').value;
  const fechaInput = document.getElementById('fecha');

  if (tipoRango === 'Dia') {
    fechaInput.setAttribute('min', '2020-01-01');
    fechaInput.setAttribute('max', '2021-12-31');
  } else if (tipoRango === 'Semana') {
    fechaInput.setAttribute('min', '2020-01-05');
    fechaInput.setAttribute('max', '2022-01-02');
  } else if (tipoRango === 'Mes') {
    fechaInput.setAttribute('min', '2020-01-31');
    fechaInput.setAttribute('max', '2021-12-31');
  }
}

const COLUMNAS_DIA = ['FECHA', 'AÑO', 'DÍA_SEMANA', 'MES', 'SEMANA', 'DÍA_FESTIVO', 'DÍA_DE_MADRES', 'DICIEMBRE_24', 'DICIEMBRE_31', 'PREDICCIÓN_CHOQUES_DIARIOS'];
const COLUMNAS_SEMANA = ['FECHA', 'AÑO', 'DÍA_SEMANA', 'MES', 'SEMANA', 'DÍA_FESTIVO', 'DÍA_DE_MADRES', 'DICIEMBRE_24', 'DICIEMBRE_31', 'PREDICCIÓN_CHOQUES_SEMANAL'];
const COLUMNAS_MES = ['FECHA', 'AÑO', 'DÍA_SEMANA', 'MES', 'SEMANA', 'DÍA_FESTIVO', 'DÍA_DE_MADRES', 'DICIEMBRE_24', 'DICIEMBRE_31', 'PREDICCIÓN_CHOQUES_MENSUAL'];



function obtenerPrediccion(event) {
  event.preventDefault();
  const tipoRango = document.getElementById('tipoRango').value;
  const fecha = new Date(document.getElementById('fecha').value);
  const fechaToUse = new Date(fecha);

  const urlCSV = tipoRango === 'Dia' ? 'csv/Predicción_diaria.csv'
    : tipoRango === 'Semana' ? 'csv/Predicción_semana.csv'
      : tipoRango === 'Mes' ? 'csv/Predicción_mes.csv'
        : undefined;

  // Lógica para cargar y procesar datos desde el CSV según el tipo de rango
  fetch(urlCSV)
    .then(response => response.text())
    .then(data => {
      const lineas = data.split('\n');
      let columnaPrediccion = '';

      if (tipoRango === 'Dia') {
        columnaPrediccion = 'PREDICCIÓN_CHOQUES_DIARIOS';
      } else if (tipoRango === 'Semana') {
        columnaPrediccion = 'PREDICCIÓN_CHOQUES_SEMANAL';
        fechaToUse.setUTCDate(fecha.getUTCDate() + (7 - fecha.getUTCDay()));
        fechaToUse.toJSON().split('T')[0]
      } else if (tipoRango === 'Mes') {
        columnaPrediccion = 'PREDICCIÓN_CHOQUES_MENSUAL';
        fechaToUse.setUTCMonth(fechaToUse.getUTCMonth() + 1, 0);
      }

      const COLUMNAS = (tipoRango === 'Dia') ? COLUMNAS_DIA :
        (tipoRango === 'Semana') ? COLUMNAS_SEMANA :
          (tipoRango === 'Mes') ? COLUMNAS_MES : [];

      console.log('fechaToUse', fechaToUse.toUTCString());

      const resultados = lineas
        .map(linea => linea.split(','))
        .filter(datos => datos[0] === fechaToUse.toJSON().split('T')[0]);

      if (resultados.length > 0) {
        const indiceColumna = COLUMNAS.indexOf(columnaPrediccion);
        const indiceFestivo = COLUMNAS.indexOf('DÍA_FESTIVO');
        const indiceMadres = COLUMNAS.indexOf('DÍA_DE_MADRES');
        const indiceD24 = COLUMNAS.indexOf('DICIEMBRE_24');
        const indiceD31 = COLUMNAS.indexOf('DICIEMBRE_31');
        console.log(indiceFestivo, indiceMadres, indiceD24, indiceD31);

        if (-1 !== indiceColumna
          || -1 !== indiceFestivo
          || -1 !== indiceMadres
          || -1 !== indiceD24
          || -1 !== indiceD31
        ) {
          const prediccion = resultados[0][indiceColumna];
          const isFestivo = resultados[0][indiceFestivo] === '1';
          const isMadres = resultados[0][indiceMadres] === '1';
          const isD24 = resultados[0][indiceD24] === '1';
          const isD31 = resultados[0][indiceD31] === '1';
          console.log(resultados[0])

          mostrarPrediccion({
            prediccion: Number(prediccion),
            isFestivo,
            isMadres,
            isD24,
            isD31,
          });
        } else {
          console.error('Columna de predicción no encontrada.');
        }
      } else {
        console.error('No se encontraron datos para la fecha seleccionada.');
      }
    })
    .catch(error => console.error(error));
}

function mostrarPrediccion(datos) {
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = '';

  if (datos.prediccion !== undefined) {
    const prediccion = datos.prediccion;
    const esFestivo = datos.isFestivo ? 'Sí' : 'No';
    const esMadres = datos.isMadres ? 'Sí' : 'No';
    const esD24 = datos.isD24 ? 'Sí' : 'No';
    const esD31 = datos.isD31 ? 'Sí' : 'No';

    resultadosDiv.innerHTML = `
      <div class="prediccion-container">
          <h2>Predicción</h2>
          <p class="prediccion-value">${prediccion}</p>
      </div>
      <div class="extra-info">
          <p><strong>Festivo:</strong> ${esFestivo}</p>
          <p><strong>Día de las Madres:</strong> ${esMadres}</p>
          <p><strong>24 de Diciembre:</strong> ${esD24}</p>
          <p><strong>31 de Diciembre:</strong> ${esD31}</p>
      </div>
    `;
  } else {
    resultadosDiv.innerHTML = 'No se encontraron datos para la fecha seleccionada.';
  }
}