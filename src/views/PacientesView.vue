<template>
    <div class="contenedor">
        <div class="contenedorSideBar">
            <SideBar class="sideBar"></SideBar>
        </div>
        <div class="body">
            <EncabezadoPrincipal></EncabezadoPrincipal>
            <section class="main-content">
                <div class="headerTable">
                    <h2>Lista de Pacientes</h2>
                    <div class="search-bar">
                        <input v-model="terminoBusqueda" type="text" placeholder="Buscar..." class="search-input" />
                        <button class="icon-button">
                            <i class="fas fa-file-pdf"></i>
                        </button>
                        <button @click="crearPaciente" class="icon-button">
                            <i class="fas fa-user-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="table-container">
                    <Spinner :isLoading="IsLoading" :can-cancel="false" @update:isLoading="IsLoading = $event"
                        class="local-spinner" />
                    <table class="patient-table" v-if="!IsLoading">
                        <thead class="encabezadoTabla">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Dni</th>
                                <th>Dirección</th>
                                <th>Celular</th>
                                <th>Institución</th>
                                <th>Usuario</th>
                                <th>Fecha de Ingreso</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="tableBody">
                            <tr v-for="paciente in listaPacientes.value" :key="paciente.idPaciente">
                                <td>{{ paciente.idPaciente }}</td>
                                <td>{{ paciente.nombrePaciente }}</td>
                                <td>{{ paciente.apellido }}</td>
                                <td>{{ paciente.dni }}</td>
                                <td>{{ paciente.direccionPaciente }}</td>
                                <td>{{ paciente.celularPaciente }}</td>
                                <td>{{ paciente.instituciones }}</td>
                                <td>{{ paciente.usuarios }}</td>
                                <td>{{ $formatDate(paciente.fechaIngreso) }}
                                </td>
                                <td>
                                    <button @click="editarPaciente(paciente.idPaciente)" class="edit-button">
                                        <!-- Botón de editar -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24">
                                            <path fill="currentColor" fill-rule="evenodd"
                                                d="M21.455 5.416a.75.75 0 0 1-.096.943l-9.193 9.192a.75.75 0 0 1-.34.195l-3.829 1a.75.75 0 0 1-.915-.915l1-3.828a.8.8 0 0 1 .161-.312L17.47 2.47a.75.75 0 0 1 1.06 0l2.829 2.828a1 1 0 0 1 .096.118m-1.687.412L18 4.061l-8.518 8.518l-.625 2.393l2.393-.625z"
                                                clip-rule="evenodd" />
                                            <path fill="currentColor"
                                                d="M19.641 17.16a44.4 44.4 0 0 0 .261-7.04a.4.4 0 0 1 .117-.3l.984-.984a.198.198 0 0 1 .338.127a46 46 0 0 1-.21 8.372c-.236 2.022-1.86 3.607-3.873 3.832a47.8 47.8 0 0 1-10.516 0c-2.012-.225-3.637-1.81-3.873-3.832a46 46 0 0 1 0-10.67c.236-2.022 1.86-3.607 3.873-3.832a48 48 0 0 1 7.989-.213a.2.2 0 0 1 .128.34l-.993.992a.4.4 0 0 1-.297.117a46 46 0 0 0-6.66.255a2.89 2.89 0 0 0-2.55 2.516a44.4 44.4 0 0 0 0 10.32a2.89 2.89 0 0 0 2.55 2.516c3.355.375 6.827.375 10.183 0a2.89 2.89 0 0 0 2.55-2.516" />
                                        </svg>
                                    </button>
                                    <button @click="eliminarPaciente(paciente.idPaciente)" class="delete-button">
                                        <!-- Botón de eliminar -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24">
                                            <g fill="none" fill-rule="evenodd">
                                                <path
                                                    d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                                                <path fill="currentColor"
                                                    d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2h-1v12a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zM17 7H7v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zm-2.72-3H9.72l-.333 1h5.226z" />
                                            </g>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </div>

    <!-- Modales -->
    <CrearModal v-if="modalCrearShow" @actualizarPacientes="listarPacientes"></CrearModal>
    <EditarModal v-if="modalEditarShow" :idPaciente="idPaciente" @actualizarPacientes="listarPacientes"></EditarModal>
    <EliminarModal v-if="modalEliminarShow" @actualizarPaciente="listarPacientes" :idPaciente="idPaciente"></EliminarModal>
</template>

<script setup>
import SideBar from '@/components/SideBar.vue';
import EncabezadoPrincipal from '@/components/EncabezadoPrincipal.vue';
import axiosFunction from '@/Functions/axios';
import { reactive, ref, onMounted, nextTick } from 'vue';
import Spinner from '@/components/Spinner.vue';
import CrearModal from '@/components/Pacientes/CrearModal.vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import EditarModal from '@/components/Pacientes/EditarModal.vue';
import EliminarModal from '@/components/Pacientes/EliminarModal.vue';


let listaPacientes = reactive([]);
let IsLoading = ref(false);
let modalCrearShow = ref(false);
let modalEditarShow = ref(false);
let idPaciente = ref(0);
let modalEliminarShow = ref(false);

onMounted(() => {
    listarPacientes()
})

function listarPacientes() {
    IsLoading.value = true;
    axiosFunction.get("Pacientes/ListarPacientes")
        .then(resultado => {
            listaPacientes.value = resultado.data.resultado;
            IsLoading.value = false;
        })
        .catch((error) => {
            console.log(error);
            IsLoading.value = false;
        })
}

function crearPaciente() {
    modalCrearShow.value = true;
    nextTick(() => {
        const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
        modal.show();
    })
}

function editarPaciente(id) {
    modalEditarShow.value = true;
    idPaciente.value = id;
    nextTick(() => {
        const modal = new bootstrap.Modal(document.getElementById("staticModalUpdate"));
        modal.show();
    })
}

function eliminarPaciente(id){
    modalEliminarShow.value = true;
    idPaciente.value = id;
    nextTick(() => {
        const modal = new bootstrap.Modal(document.getElementById("staticModalDelete"));
        modal.show();
    })
}

</script>


<style scoped>
.contenedor {
    display: flex
}

/* Flexbox para hacer el header de la tabla adaptable */
.headerTable {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

/* Flexbox para la barra de búsqueda */
.search-bar {
    display: flex;
    align-items: center;
}

.search-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    flex-grow: 1;
    /* Hace que el input se ajuste al espacio disponible */
}

.icon-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    margin-left: 10px;
}

/* Contenedor principal para hacer la tabla flexible */
.main-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-top: 120px;
    margin-left: 70px;
    padding: 50px;
    border-radius: 30px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.9);
    background-color: white;
    margin-right: 20px;
    margin-bottom: 20px;
    min-width: 68vw;
    min-height: 500px;
}

/* Flexbox para la tabla y su contenedor */
.table-container {
    display: flex;
    flex-grow: 1;
    max-height: 350px;
    overflow-y: auto;
    position: relative;
    /* Permite que la tabla se despliegue horizontalmente si es necesario */
}

.patient-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 10px;
    flex-grow: 1;
}

.patient-table th,
.patient-table td {
    padding: 15px;
    text-align: center;
    /* Cambié el texto a centrado para una mejor alineación visual */
    border-bottom: 1px solid #eaeaea;
    white-space: nowrap;
    /* Evita que el contenido se ajuste en múltiples líneas */
}

.patient-table th {
    background-color: #f5f5f5;
}

.edit-button,
.delete-button {
    background-color: transparent;
    cursor: pointer;
    border: none;
}

.edit-button {
    color: #014CD8;
}

.delete-button {
    color: #f44336;
}

.tableBody {
    overflow: hidden;
}

.local-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
}



/* ===================================== */
@media (max-width: 1920px) {

    .patient-table th,
    .patient-table td {
        font-size: 14px;
        padding: 10px;
    }

    .headerTable h2 {
        font-size: 24px;
    }

    .search-input {
        font-size: 14px;
    }

    .icon-button {
        font-size: 18px;
    }

    .main-content {
        padding: 30px;
    }

    .table-container {
        padding: 10px;
    }
}
</style>