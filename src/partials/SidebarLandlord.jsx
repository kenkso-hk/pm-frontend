import { useEffect, useRef ,useState} from "react";
import { TbLayoutGridFilled, TbLayoutFilled } from "react-icons/tb"; // Import the icons
import { useLocation } from "react-router-dom";

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 transition-opacity duration-200 lg:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col fixed z-40 left-0 top-0 h-full overflow-y-scroll no-scrollbar bg-slate-800 p-4 transition-all duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} 
          ${sidebarExpanded ? 'w-64' : 'w-20'}
          lg:static lg:translate-x-0`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
        </div>

        {/* Expand / collapse button centered */}
        <div className="flex justify-center items-center my-4">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              {sidebarExpanded ? (
                <TbLayoutFilled className="w-6 h-6 fill-current transition-transform duration-200" />
              ) : (
                <TbLayoutGridFilled className="w-6 h-6 fill-current transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            {/* Heading with pages */}
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block">Pages</span>
            </h3>
            <ul className="mt-3">
              <li className={`px-3 py-2 rounded-sm mb-0.5 ${pathname.includes('inbox') && 'bg-slate-900'}`}>
                <button
                  onClick={() => { window.location.href = '/landlord-dashboard'; }}
                  className="w-full text-left block text-slate-200 truncate transition duration-150 hover:text-white"
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className="fill-current text-slate-600" d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z" />
                      <path className="fill-current text-slate-400" d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z" />
                    </svg>
                    <span className={`ml-3 text-sm font-medium transition-opacity duration-200 ${sidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>
                      Home
                    </span>
                  </div>
                </button>
              </li>

              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('inbox') && 'bg-slate-900'}`}>
                <button
                  onClick={() => { window.location.href = '/landlord-applications'; }}
                  className={`w-full text-left block text-slate-200 truncate transition duration-150 ${pathname.includes('inbox') ? 'hover:text-slate-200' : 'hover:text-white'}`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className={`fill-current ${pathname.includes('inbox') ? 'text-indigo-500' : 'text-slate-600'}`} d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z" />
                      <path className={`fill-current ${pathname.includes('inbox') ? 'text-indigo-300' : 'text-slate-400'}`} d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      My Applications
                    </span>
                  </div>
                </button>
              </li>

              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('inbox') && 'bg-slate-900'}`}>
                <button
                  onClick={() => { window.location.href = '/my-complexes'; }}
                  className={`w-full text-left block text-slate-200 truncate transition duration-150 ${pathname.includes('inbox') ? 'hover:text-slate-200' : 'hover:text-white'}`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className={`fill-current ${pathname.includes('inbox') ? 'text-indigo-500' : 'text-slate-600'}`} d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z" />
                      <path className={`fill-current ${pathname.includes('inbox') ? 'text-indigo-300' : 'text-slate-400'}`} d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      My Complex
                    </span>
                  </div>
                </button>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
