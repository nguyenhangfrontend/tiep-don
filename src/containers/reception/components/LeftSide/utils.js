export const combinePatientType = patients => {
  if (patients && patients.length > 0) {
    const newPatients = patients.filter(patient => patient.status === 10);
    const waitingPatents = patients.filter(patient => patient.status === 20);
    const skipPatients = patients.filter(patient => patient.status === 30);
    const receivedPatients = patients.filter(patient => patient.status === 40);

    return { newPatients, waitingPatents, skipPatients, receivedPatients };
  }else {
    return { newPatients: [], waitingPatents: [], skipPatients: [], receivedPatients: []}
  }
};
