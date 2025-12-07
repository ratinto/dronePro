import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sidebar from './components/Sidebar'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function KmlUpload() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.name.endsWith('.kml')) {
      setFile(selectedFile)
      setError('')
    } else {
      setFile(null)
      setError('Please select a valid .kml file')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!file) {
      setError('Please select a file')
      return
    }

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('kmlFile', file)

    try {
      const response = await axios.post(`${API_URL}/api/mission/upload-kml`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.status === 'ok' && response.data.mission_id) {
        navigate(`/mission/${response.data.mission_id}`)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload file')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar />
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">KML Upload</h1>
            <p className="text-gray-400">Upload your mission KML file</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select KML File
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".kml"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer bg-gray-900 rounded-lg border border-gray-700"
                />
              </div>
              {file && (
                <p className="mt-2 text-sm text-green-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {file.name}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!file || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                'Upload & View Mission'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default KmlUpload
