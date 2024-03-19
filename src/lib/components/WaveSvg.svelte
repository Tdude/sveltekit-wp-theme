<!-- src/components/WaveSvg.svelte -->
<script>
export let bgColorClass = '';
//let bgColorClass = 'bg-slate-800';
let fillColor = '';
// Map class to CSS variable color
$: {
    if (bgColorClass === 'bg-slate-800') fillColor = 'var(--color-bg-slate-800)';
    else if (bgColorClass === 'bg-slate-900') fillColor = 'var(--color-bg-slate-900)';
}
</script>


<div class="wave wave-bottom w-full">
    <svg viewBox="0 0 1440 116" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 51.4091H349.922C606.664 51.4091 859.771 116 1080 116C1300.23 116 1440 51.4091 1440 51.4091V0H0V51.4091Z" fill={fillColor}></path>
    </svg>
</div>
