export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var p=localStorage.getItem('converttexteasy-theme');var r;if(p==='dark')r='dark';else if(p==='light')r='light';else r=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';if(r==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark')}catch(e){}})()`,
      }}
    />
  );
}
