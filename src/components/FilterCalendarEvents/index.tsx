import { useEffect, useState } from "react";

interface Props {
  filterParams: { [key: string]: string };
  setFilterParams: (date: { [key: string]: string }) => void;
  updateList: () => void;
}

export function FilterCalendarEvents({
  filterParams,
  setFilterParams,
  updateList,
}: Props) {
  const [dateFilter, setDateFilter] = useState("");

  const handleClearFilter = () => {
    setFilterParams({ ...filterParams, startDateTime: "" });
    setDateFilter("");
  };

  const handleFilter = () => {
    setFilterParams({ ...filterParams, startDateTime: dateFilter });
    updateList();
  };

  useEffect(() => {
    if (filterParams.startDateTime === "" && dateFilter === "") {
      updateList();
    }
  }, [filterParams, dateFilter]);

  return (
    <>
      <h6 className="mx-5 mt-5">Filtros:</h6>
      <form className="d-flex align-items-center flex-wrap gap-4 mx-5 px-4 py-2 border border-dark-subtle">
        <div className=" d-flex flex-column w-100 mb-3">
          <label htmlFor="initial-date" className="form-label">
            Data
          </label>
          <input
            value={dateFilter}
            type="datetime-local"
            onChange={(event) => setDateFilter(event.target.value)}
            className="form-control"
            id="initial-date"
          />
        </div>

        <div className="d-flex align-items-center gap-3 flex-wrap">
          <button
            type="button"
            className="mt-3 btn btn-outline-primary"
            onClick={handleFilter}
          >
            Filtrar
          </button>

          <button
            type="button"
            onClick={handleClearFilter}
            className="mt-3 btn btn-outline-secondary"
          >
            Limpar Filtro
          </button>
        </div>
      </form>
    </>
  );
}
