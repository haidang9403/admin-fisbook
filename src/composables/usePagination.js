import { ref, computed, watch } from "vue";

export default function usePagination({ data, perPage = 10, router }) {
    const query = computed(() => router.currentRoute.value.query);

    const page = ref(parseInt(query.page || query.page < 0) || 1);

    watch(() => router.currentRoute.value.query, (newQuery) => {
        page.value = parseInt(newQuery.page)
    })

    const totalPage = Math.ceil(data.length / perPage);

    const paginatedData = computed(() =>
        data.slice((page.value - 1) * perPage, page.value * perPage)
    );

    const setPage = (numPage) => {
        page.value = numPage;
        const currentPath = router.currentRoute.value.path;
        router.push({
            path: currentPath,
            query: { page: numPage }
        })
    }


    const nextPage = () => {
        if (page.value !== totalPage) {
            setPage(page.value + 1)
        }
    };

    const backPage = () => {
        if (page.value !== 1) {
            setPage(page.value - 1)
        }
    };

    const goToPage = (numPage) => {
        setPage(numPage)
    };

    return { paginatedData, perPage, page, nextPage, backPage, goToPage, totalPage };
}
