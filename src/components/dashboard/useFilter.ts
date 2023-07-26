import { useState } from 'react';

interface DataItem {
  documento: {
    [key: string]: {
      cant: number;
    };
  };
  turno: {
    turnoNoche: {
      tipo: {
        [key: string]: {
          cant: number;
        };
      };
      cant: number;
    };
    turnoDia: {
      cant: number;
    };
  };
  division: {
    [key: string]: {
      cant: number;
      tipo: {
        [key: string]: {
          cant: number;
        };
      };
      turno: {
        turnoNoche: {
          cant: number;
        };
        turnoDia: {
          cant: number;
        };
      };
    };
  };
}

interface DataJson {
  [key: string]: DataItem;
}

interface FilterState {
  startDate: string;
  endDate: string;
}

const useFilter = (
  data: DataJson,
  initialMinDate: string,
  initialMaxDate: string,
  tipoDocumentoLabels: { [key: string]: string }
): [
  DataJson,
  FilterState,
  (minDate: string, maxDate: string) => void,
  () => { labels: string[]; data: number[] },
  (selectedDivision: string) => { labels: string[]; data: number[] },
  () => { fecha: Date[]; labels: string[]; data: number[] }
] => {
 
 
  const [filterState, setFilterState] = useState<FilterState>({
    startDate: initialMinDate,
    endDate: initialMaxDate,
  });
  

  const updateDates = (minDate: string, maxDate: string) => {
    setFilterState({
      startDate: minDate,
      endDate: maxDate,
    });
  };

  // Función para procesar los datos y devolver los datos filtrados
  const processDataDate = () => {
    const startDate = new Date(filterState.startDate);
    const endDate = new Date(filterState.endDate);

    const filteredData: DataJson = {};

    for (const date in data) {
      const currentDate = new Date(date);
      if (currentDate >= startDate && currentDate <= endDate) {
        filteredData[date] = data[date];
      }
    }

    return filteredData;
  };

  const processData = () => {
    const filteredData = processDataDate();

    const tipoDocumentoTotals: { [key: string]: number } = {};

    for (const date in filteredData) {
      const tiposDocumento = filteredData[date]?.documento || {};

      for (const tipoDocumento in tiposDocumento) {
        const cantidad = tiposDocumento[tipoDocumento].cant;
        const label = tipoDocumentoLabels[tipoDocumento] || tipoDocumento;

        // Sumar la cantidad al total del tipo de documento
        tipoDocumentoTotals[label] = (tipoDocumentoTotals[label] || 0) + cantidad;
      }
    }

    // Convertir los totales en arreglos de datos y etiquetas para el gráfico
    const labels = Object.keys(tipoDocumentoTotals);
    const data = Object.values(tipoDocumentoTotals);

    return { labels, data };
  };

  const processDataDivision = (selectedDivision: string) => {
    const filteredData = processDataDate();

    const tipoDocumentoTotals: { [key: string]: number } = {};

    for (const date in filteredData) {
      const divisionData = filteredData[date]?.division || {};
      const selectedDivisionData = divisionData[selectedDivision] || {};

      const tiposDocumento = selectedDivisionData.tipo || {};

      for (const tipoDocumento in tiposDocumento) {
        const cantidad = tiposDocumento[tipoDocumento].cant;
        const label = tipoDocumentoLabels[tipoDocumento] || tipoDocumento;

        // Sumar la cantidad al total del tipo de documento
        tipoDocumentoTotals[label] = (tipoDocumentoTotals[label] || 0) + cantidad;
      }
    }

    // Convertir los totales en arreglos de datos y etiquetas para el gráfico
    const labels = Object.keys(tipoDocumentoTotals);
    const data = Object.values(tipoDocumentoTotals);

    return { labels, data };
  };

  const getDocumentData = () => {
    const dates: Date[] = [];
    const labels: string[] = [];
    const data: number[] = [];

    for (const fecha in filteredData) {
      if (Object.prototype.hasOwnProperty.call(filteredData, fecha)) {
        const documento = filteredData[fecha].documento;

        for (const tipo in documento) {
          if (Object.prototype.hasOwnProperty.call(documento, tipo)) {
            const cant = documento[tipo].cant;

            // Agregar los datos a los arrays
            dates.push(new Date(fecha));
            labels.push(tipo);
            data.push(cant);
          }
        }
      }
    }

    return { fecha: dates, labels, data };
  };

  const filteredData = processDataDate();

  return [
    filteredData,
    filterState,
    updateDates,
    processData,
    processDataDivision,
    getDocumentData,
  ];
};

export default useFilter;
