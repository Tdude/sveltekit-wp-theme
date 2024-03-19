<!-- src/components/NavMobile.svelte -->
<script>
    import Logo from './Logo.svelte';
    import NavLink from './NavLink.svelte';
    let href = '';
    let text = '';
</script>

<nav class="flex justify-between p-6 px-4 bg-slate-900">
  <div class="flex justify-between items-center w-full">
    <div class="w-1/2 xl:w-1/3">
      <Logo src="images/tryggve-logo-inv-green.svg" alt="" />
    </div>
    <div class="w-1/2 xl:w-1/3">
      <ul class="hidden xl:flex xl:justify-center">
        <NavLink href={href} text={text}/>
      </ul>
    </div>
    <!-- Include login and register buttons here, similar to NavLink component usage -->
  </div>
  <!-- Include NavbarToggle button here -->
</nav>
