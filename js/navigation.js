
let sidebar = document.querySelector( '.sidebar' );
if( sidebar ) {

	// Update the selected item in the navigation to
	// match the current URL & hash.
	let updateSelection = () => {

		let currentURL = window.location.pathname.replace( /\/$/, '' ) + '/' + window.location.hash;
		let newSelection = sidebar.querySelector( '.nav-link[href="'+ currentURL +'"]' )

		if( newSelection ) {
			let selectedItem = sidebar.querySelector( '.nav-link.selected' );
			if( selectedItem ) selectedItem.classList.remove( 'selected' );
			newSelection.classList.add( 'selected' )
		}

	}

	updateSelection();

	window.addEventListener( 'hashchange', updateSelection );

	// Remember the sidebar scroll position between page loads
	let storedScrollTop = parseInt( localStorage.getItem( 'sidebar-scroll-top' ), 10 );
	let storedScrollTime = parseInt( localStorage.getItem( 'sidebar-scroll-time' ), 10 )

	if( !isNaN( storedScrollTop ) && !isNaN( storedScrollTime ) && Date.now() - storedScrollTime < 1000 ) {
		document.querySelector( '.sidebar-scroller' ).scrollTop = storedScrollTop;
	}

	Array.from( sidebar.querySelectorAll( '.nav-link' ) ).forEach( link => {
		link.addEventListener( 'click', () => {
			localStorage.setItem( 'sidebar-scroll-top', document.querySelector( '.sidebar-scroller' ).scrollTop );
			localStorage.setItem( 'sidebar-scroll-time', Date.now() );
		} );
	} );

	// Toggle the mobile nav.
	document.querySelector( '.menu-toggle' ).addEventListener( 'click', () => {
		sidebar.classList.toggle( 'hidden' );
	} )

}