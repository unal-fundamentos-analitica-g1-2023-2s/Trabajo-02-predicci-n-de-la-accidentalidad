## Predecir la accidentalidad en Medellín
En este trabajo se abordará el problema de predecir la accidentalidad en la ciudad de Medellín a partir de la historia reciente de los accidentes reportados.


El insumo principal de este trabajo son los [datos abiertos de incidentes viales](http://medata.gov.co/dataset/incidentes-viales) que publica la Alcaldía de Medellín en el portal [MeData](http://medata.gov.co/).

**1 - Entrenamiento de un modelo predictivo**
Se deberá construir un modelo que permita predecir la accidentalidad por tipo de accidente a nivel semanal, mensual y diario. Para esto se deberán considerar fechas especiales.

Entrenamiento y validación
Se deben dejar los últimos 12 meses disponibles en el conjunto de datos para validación.

Se deberá analizar el comportamiento del modelo predictivo en los años 2020 y 2021 y explicar las posibles desviaciones con respecto a los años anteriores.

**2 - Agrupamiento de los barrios de Medellín de acuerdo a su accidentalidad**
Se deberán agrupar los barrios de Medellín de acuerdo a su accidentalidad. Cada equipo deberá crear las variables que estime convenientes (i.e. promedio de colisiones, colisiones con peatones, heridos, etc.).

La agrupación de los barrios deberá presentarse en un mapa y se deberán discutir las características espaciales de este agrupamiento.

**3 - Modelamiento**
Para el modelamiento se podrá usar cualquier método visto en el curso o apropiado por los estudiantes. El criterio de éxito de los modelos predictivos será el error cuadrático medio de la predicción.

Para prevenir el sobreentrenamiento se penalizarán variaciones excesivas entre los errores cuadráticos medios de entrenamiento y validación. Variaciones de más del 15% se considerarán sospechosas de sobreeentrenamiento.

Para el agrupamiento se evaluará la utilidad del agrupamiento para la intervención de la accidentalidad. Cada equipo deberá formular creativamente los retos que su agrupamiento puede resolver y enunciar los posibles planes de acción.

**4 - Entregables**

Los entregables de este trabajo serán los siguientes:

**4.1 Aplicación web**
**4.1.1. Visualización:** esta aplicación deberá permitir seleccionar una ventana de tiempo y obtener los datos históricos de accidentalidad por tipo de accidente.

**4.1.2. Predicción:** la aplicación también deberá permitir predecir la accidentalidad por tipo de accidente utilizando una ventana y una resolución temporal definidas por el usuario.

**4.1.3. Agrupamiento:** la aplicación deberá permitir visualizar los grupos de barrios en un mapa (i.e., cada barrio tiene el color de su grupo). Al seleccionar un barrio se deben poder visualizar las características del barrio y las del grupo al que pertenece.

**4.2 Video promocional**
La aplicación web deberá estar acompañada de un video promocional en youtube donde se explique los beneficios de utilizarla y el cómo se usa. Tanto la aplicación como el video se deben construir pensando en un usuario en particular definido por los estudiantes.

**4.3 Reporte técnico**
Se debe generar un reporte que contenga el entendimiento desarrollado en el trabajo, su bibliografía de soporte y la metodología seguida debidamente justificada. El reporte debe estar publicado como una entrada de blog.

**4.4 Código**
Se debe referenciar en el reporte técnico un repositorio Git donde se pueda consultar el código.

**5 - Equipos y fecha de entrega**

Se recomienda mantener los equipos de la primera entrega. Las contribuciones al repositorio git y las modificaciones aportadas por cada estudiante se tendrán en cuenta.

La entrega se hará a través de la plataforma Google Classroom del curso en el espacio correspondiente para ello. Solo un integrante del grupo debe publicar el trabajo en la plataforma.


# Links de interés:
- Notebook en Deepnotes: https://deepnote.com/workspace/fundamentos-de-analitica-2023-2s-a07f5bfc-2e4d-480f-a78a-128611dba2f2/project/Modelo-de-prediccion-incidentes-en-Medellin-7a66f1f6-a22d-45c4-8e8c-1b7948ed24c7/notebook/Notebook%201-a269757fe10244c59c811b25fdf4ff87
- Webpage: https://unal-fundamentos-analitica-g1-2023-2s.github.io/Trabajo-02-predicci-n-de-la-accidentalidad/index.html
- Reporte técnico: https://unal-fundamentos-analitica-g1-2023-2s.github.io/Trabajo-02-predicci-n-de-la-accidentalidad/blog/reporte.html
