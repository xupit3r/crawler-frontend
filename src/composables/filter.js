import { reactive } from "vue";

export const useFilter = (filter, limit = 50) => {
  const filterState = reactive({
    isFiltering: false,
    results: []
  });

  const doFilter = () => {
    filterState.isFiltering = true;

    setTimeout(() => {
      filterState.results = filter().slice(0, limit);
      setTimeout(() => filterState.isFiltering = false, 10);
    }, 10);
  };

  return {
    doFilter,
    filterState
  };
}