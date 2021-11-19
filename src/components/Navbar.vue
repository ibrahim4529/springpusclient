<script setup lang="ts">
import useState from '~/store/auth'
const { isLoggedIn, user } = useState()
const router = useRouter()
const logout = () => {
  isLoggedIn.value = false
  user.value = null
  localStorage.clear()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        SPRINGPUS
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul v-if="isLoggedIn" class="navbar-nav me-auto mb-2 mb-lg-0">
          <NavItem text="Buku" :link="user.userRole == 'ADMIN' ? '/admin/book': '/user/book'" :active="true" />
          <NavItem v-if="user.userRole == 'ADMIN'" text="Author" link="/admin/author" :active="true" />
        </ul>
        <ul v-if="isLoggedIn" class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              id="navbarDropdownMenuLink"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ user.name }} ({{ user.userRole }})
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" @click="logout">Logout</a></li>
            </ul>
          </li>
        </ul>
        <ul v-if="!isLoggedIn" class="navbar-nav ms-auto mb-2 mb-lg-0">
          <NavItem text="Login" link="/login" :active="false" />
          <NavItem text="Register" link="/register" :active="false" />
        </ul>
      </div>
    </div>
  </nav>
</template>
