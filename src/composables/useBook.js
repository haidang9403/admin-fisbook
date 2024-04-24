import { onMounted, onBeforeMount, ref } from 'vue';
import router from '@/router';
// import { useAlert } from '@/composables/useAlert';

import bookService from '@/services/book.service';

const useBook = () => {
    const authors = ref(null);
    const categories = ref(null);
    const publishers = ref(null);

    const initData = {
        title: '',
        photo: '',
        price: null,
        amount: null,
        author: '',
        publisher: '',
        category: ''
    }

    const data = ref(initData);
    // const { showAlert, showAlertMessage, dismissAlert, alertType, alertMessage } = useAlert()

    const set = {
        author: (id) => {
            data.value.author = id;
        },
        category: (id) => {
            data.value.category = id;
        },
        publisher: (id) => {
            data.value.publisher = id;
        },
        image: (file) => {
            if (file) {
                data.value.photo = file;
            } else {
                data.value.photo = '';
            }
        }
    }

    const add = {
        author: async (value) => {
            try {
                await bookService.addAuthor({
                    fullname: value
                })
                fetchAuthor()
            } catch (err) {
                console.log(err)
            }
        },
        category: async (value) => {
            try {
                await bookService.addCategory({
                    title: value
                })
                fetchCategory()
            } catch (err) {
                console.log(err)
            }
        },
        publisher: async (value) => {
            try {
                await bookService.addPublisher({
                    name: value
                })
                fetchPublisher()
            } catch (err) {
                console.log(err)
            }
        }
    }

    const fetchAuthor = async () => {
        const authorData = await bookService.getAuthor();
        authors.value = authorData.map((item) => {
            return {
                _id: item._id,
                value: item.fullname
            }
        })
    }

    const fetchCategory = async () => {
        const categoryData = await bookService.getCategory();
        categories.value = categoryData.map((item) => {
            return {
                _id: item._id,
                value: item.title
            }
        })
    }

    const fetchPublisher = async () => {
        // Get publisher
        const publisherData = await bookService.getPublisher();
        publishers.value = publisherData.map((item) => {
            return {
                _id: item._id,
                value: item.name
            }
        })
    }

    onMounted(() => {
        fetchAuthor();
        fetchCategory();
        fetchPublisher();
    })

    onBeforeMount(async () => {
        const id = router.currentRoute.value.params.id
        if (id) {
            data.value = await bookService.getOne(id);
        }
    })

    return {
        data,
        authors,
        categories,
        publishers,
        set,
        add,
    }
}

export default useBook;
