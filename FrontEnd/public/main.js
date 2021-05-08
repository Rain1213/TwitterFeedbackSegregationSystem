const initiateServiceWorker = () => {
    if('serviceWorker' in navigator) {
        window.addEventListener('load', async (event) => {
            try {
                const reg =  await navigator.serviceWorker.register('../service_worker.js');
                // console.log(`Service Worker Registered: ${reg}`)
            } catch(error) {
                console.log(error);
            }
        });
    }
}

initiateServiceWorker();