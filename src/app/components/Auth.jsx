
export default function Auth({email, setEmail, password, setPassword, isSignUp, setIsSignUp, handleSubmit}){
    return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
      <div className="bg-neutral-800 p-6 rounded-lg w-96 space-y-5">

        <h1 className="text-2xl font-semibold text-center">
          {isSignUp ? "Sign Up" : "Sign In" }
        </h1>

      
        <form onSubmit={handleSubmit}
        className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value = {email}
            onChange={(e)=>{
              setEmail(e.target.value);
            }}
            className="w-full p-2 rounded bg-neutral-700 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value = {password}
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
            className="w-full p-2 rounded bg-neutral-700 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-neutral-600 py-2 rounded hover:bg-neutral-500 transition"
          >
            {isSignUp ? "Sign Up" : "Sign In" }
          </button>
        </form>

        {/* Switch */}
        <p className="text-sm text-center text-neutral-400">
          {isSignUp ? "Already have an account?" : "Don’t have an account?" } 
          <button
            type="button"
            onClick={()=>{
              setIsSignUp(!isSignUp);
            }}
            className="text-white underline ml-1"
          >
           {isSignUp ? "Sign In" : "Sign Up" }
          </button>
        </p>
      </div>
    </div>
  );
}