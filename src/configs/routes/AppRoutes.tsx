import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PgPdfCapilar from '../../pages/pdfPageCapilar/pgPdfCapilar';
import PgPdfFacial from '../../pages/pdfPageFacial/pgPdfFacial';
import SaibaMais from '../../pages/saibaMais';
import Sobre from '../../pages/sobre/sobre';
import TermoDeConduta from '../../pages/termoDeConduta/termoDeConduta';
import Transparencia from '../../pages/transparencia/transparencia';
import Welcome from '../../pages/Welcome';

const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Welcome />} />
				{/* <Route path="/localizacao" element={<MapWithGeocoding />} /> */}
				<Route path="/pre-cons-capilar" element={<PgPdfCapilar />} />
				<Route path="/pre-cons-facial" element={<PgPdfFacial />} />
				{/* <Route path="/tokenRefresh" element={<TokenRefresh />} /> */}
				{/* <Route path="/pre-cons-pdf4" element={<PgPdf4 />} /> */}
				<Route path="/servicos" element={<SaibaMais />} />
				<Route path="/sobre" element={<Sobre />} />
				<Route path="/termo-de-conduta" element={<TermoDeConduta />} />
				<Route path="/transparencia" element={<Transparencia />} />
				{/* <Route path="/rastrMetabolico" element={<RastreaMtlblco />} /> */}
			</Routes>
		</BrowserRouter>
		//MapWithGeocoding
	);
};
export default AppRoutes;
