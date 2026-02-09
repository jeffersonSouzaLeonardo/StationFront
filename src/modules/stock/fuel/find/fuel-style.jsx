// Estilos para FuelFindView usando objetos compatíveis com `sx` do MUI
export function fuelFindStyles({ isSmDown, theme }) {
	return {
		container: { p: 2 },
		title: { fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }, mb: 2 },
		paper: { p: { xs: 2, md: 4 }, borderRadius: 2, overflowX: 'auto', maxWidth: '100%' },
		filterPaper: { p: 2, borderRadius: 2, mb: 2 },
		filterGridRight: { display: 'flex', alignItems: 'center', justifyContent: { xs: 'stretch', md: 'flex-end' } },
		applyButton: { width: { xs: '100%', md: 'auto' } },
		dataBox: {
			width: '100%',
			height: isSmDown ? 'auto' : { xs: '60vh', sm: '55vh', md: '60vh' },
			minHeight: 300,
			maxHeight: '80vh',
			overflow: 'auto',
			overflowX: 'auto'
		}
	};
}

export default fuelFindStyles;

