export function initConfig(store, router) {
  //logica para autenticar rutas antes de ingresar
	router.beforeEach((to, from, next) => {
		const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
		const currentUser = store.state.currentUser;

		if (requiresAuth && !currentUser) {
			next('/login');
		} else if (to.path == '/login' && currentUser) {
			next('/clients')
		} else {
			next()
		}
	});

	axios.interceptors.response.use(null, (error) => {
    if (error.response.status == 401) {
      store.commit('SET_LOGOUT');
			router.push('/login');
		}
		return Promise.reject(error);
	});
  
	if (store.state.currentUser) {
    setAuthorization(store.state.currentUser.token);
	}
}

//logica para enviar token
export function setAuthorization(token) {
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
} 


export function getLocalUser() {
	const userStr = localStorage.getItem("user");

	if (!userStr) {
		return null;
	}

	return JSON.parse(userStr);
}