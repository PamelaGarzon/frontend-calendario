interface Props {
  dateFilter: string;
  setDateFilter: (date: string) => void;
  updateList: () => void;
}

export function FilterCalendarEvents({
  dateFilter,
  setDateFilter,
  updateList,
}: Props) {
  return (
    <>
      <h6 className="mx-5 mt-5">Filtros:</h6>
      <form className="d-flex align-items-center flex-wrap gap-4 mx-5 px-4 py-2 border border-dark-subtle">
        <div className="mb-3">
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

        <div>
          <button
            type="button"
            className="mt-3 btn btn-outline-primary"
            onClick={updateList}
          >
            Filtrar
          </button>
        </div>
      </form>
    </>
  );
}
