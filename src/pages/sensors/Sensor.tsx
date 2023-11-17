import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Add from "../../components/Add/Add";
import { columns } from "../../components/SensorTable/SensorColumns";
import DataTable from "../../components/dataTable/DataTable";
import { SensorEntity } from "../../model/Sensor.ts";
import "./sensor.scss";

const mapToRowsData = (apiResponse: SensorEntity[]) => {
  let novaLista = apiResponse.map(function (objeto: SensorEntity) {
    let novoObjeto = {
      id: objeto.wmo,
      idDb: objeto.id,
      cidade: objeto.nameCity,
      regiao: objeto.region,
      dataCriacao: "09/11/2023",
      uf: objeto.uf,
      latitude: objeto.latitude,
      longitude: objeto.longitude,
      altitude: objeto.altitude,
    };
    return novoObjeto;
  });
  return novaLista;
};

const Sensor = () => {
  const [open, setOpen] = useState(false);

  const { isPending, data } = useQuery({
    queryKey: ["allSensor"],
    queryFn: () =>
      fetch("http://host.docker.internal:8080/client")
        .then((res) => res.json())
        .then(mapToRowsData),
  });

  let rowsData = data !== undefined ? data : [];
  return (
    <div className="sensor">
      <div className="info">
        <h1>Sensores</h1>
        <button onClick={() => setOpen(true)}>Adicionar novo Sensor</button>
      </div>
      {isPending ? (
        "Loading..."
      ) : (
        <DataTable slug="sensores" columns={columns} rows={rowsData} />
      )}
      {open && <Add slug="sensor" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Sensor;
