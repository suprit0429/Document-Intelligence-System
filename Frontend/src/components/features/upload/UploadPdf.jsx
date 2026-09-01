import React, { useState, useRef } from 'react';
import {
  HiOutlineArrowUpTray,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineXMark,
  HiOutlineArrowRight,
  HiOutlineArrowPath
} from 'react-icons/hi2';
import API from '../../../services/api';

export const UploadPdf = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle' | 'uploading' | 'success' | 'error'
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);


  const handleZoneClick = () => {
    if (uploadStatus === 'uploading') return;
    fileInputRef.current.click();
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      setErrorMessage('FILE TYPE INVALID. PLEASE UPLOAD A PDF DOCUMENT.');
      setUploadStatus('error');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMessage('FILE IS TOO LARGE. MAXIMUM PERMITTED SIZE IS 10MB.');
      setUploadStatus('error');
      return;
    }

    setFile(selectedFile);
    setUploadStatus('idle');
    setErrorMessage('');
    setUploadProgress(0);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    if (uploadStatus === 'uploading') return;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (uploadStatus === 'uploading') return;

    const droppedFile = e.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const handleClear = (e) => {
    if (e) e.stopPropagation();
    setFile(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    setUploadResult(null);
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };


  const handleUpload = async () => {
    if (!file) return;

    setUploadStatus('uploading');
    setUploadProgress(10);

    const formData = new FormData();
    formData.append('pdf', file);

    const token = localStorage.getItem('token');

    try {
      const response = await API.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(Math.min(percentCompleted, 95));
        },
      });

      setUploadProgress(100);
      setUploadStatus('success');
      setUploadResult(response.data);
    } catch (error) {
      console.error('PDF Upload Error:', error);
      const msg =
        error.response?.data?.message ||
        error.message ||
        'Server error occurred during upload.';
      setErrorMessage(msg);
      setUploadStatus('error');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="w-full border-4 border-white bg-surface/90 shadow-[8px_8px_0px_0px_rgba(40,129,205,0.4)] backdrop-blur-md overflow-hidden flex flex-col font-['Pixelify_Sans'] tracking-wide">


        <div className="bg-primary border-b-4 border-white px-4 py-2 flex items-center justify-between select-none">
          <span className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-white tracking-widest uppercase">
            ★ DOCUMENT-UPLOADER.EXE ★
          </span>
          <div className="flex gap-1.5">
            <span
              className="w-3.5 h-3.5 border-2 border-white bg-transparent flex items-center justify-center font-['Press_Start_2P'] text-[8px] text-white cursor-pointer hover:bg-white/10"
              onClick={handleClear}
            >
              -
            </span>
            <span className="w-3.5 h-3.5 border-2 border-white bg-transparent flex items-center justify-center font-['Press_Start_2P'] text-[8px] text-white cursor-not-allowed hover:bg-white/10">
              ■
            </span>
            <span
              className="w-3.5 h-3.5 border-2 border-white bg-red-500 flex items-center justify-center font-['Press_Start_2P'] text-[8px] text-white cursor-pointer hover:bg-red-600"
              onClick={handleClear}
            >
              X
            </span>
          </div>
        </div>


        <div className="p-6 sm:p-10 flex flex-col items-center">
          <h1 className="text-xl font-bold mb-2 text-center font-['Press_Start_2P'] text-white leading-normal uppercase">
            Upload your PDF
          </h1>
          <p className="text-center font-light mb-8 text-sm text-text-secondary font-['Pixelify_Sans'] tracking-wide max-w-md">
            Provide a textbook or study guide PDF to generate summaries, quizzes, and planner tasks.
          </p>

          {uploadStatus !== 'success' && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleZoneClick}
              className={`w-full border-4 border-dashed rounded-none p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-150 select-none
                ${isDragging
                  ? 'border-accent bg-primary/10 scale-[0.99] shadow-[inset_0_0_15px_rgba(96,205,255,0.2)]'
                  : 'border-white/40 hover:border-accent hover:bg-surface-light/45'
                }
              `}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf"
                disabled={uploadStatus === 'uploading'}
              />

              <div
                className={`p-4 border-2 border-white bg-surface shadow-[4px_4px_0px_0px_#000] mb-4 transition-colors
                  ${isDragging ? 'animate-bounce border-accent text-accent' : 'text-text-secondary hover:text-white'}
                `}
              >
                <HiOutlineArrowUpTray size={36} className={uploadStatus === 'uploading' ? 'animate-pulse' : ''} />
              </div>

              <p className="font-['Press_Start_2P'] text-[9px] sm:text-[10px] text-white mb-2 text-center leading-relaxed">
                {isDragging ? '[ DROP PDF NOW ]' : 'DRAG & DROP YOUR PDF HERE'}
              </p>

              <p className="text-xs text-text-secondary text-center mb-4">- OR -</p>

              <button
                type="button"
                className="font-['Press_Start_2P'] text-[9px] px-4 py-2 border-2 border-white bg-primary text-white font-bold transition-all duration-75 shadow-[3px_3px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-primary-light cursor-pointer uppercase"
                disabled={uploadStatus === 'uploading'}
              >
                SELECT FILE
              </button>

              <p className="text-[10px] text-text-secondary mt-3">
                Max file size: 10MB (PDF format only)
              </p>
            </div>
          )}


          {file && uploadStatus !== 'success' && (
            <div className="w-full mt-6 border-4 border-white bg-surface-light p-4 shadow-[4px_4px_0px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 w-full sm:w-auto overflow-hidden">
                <div className="p-2 border-2 border-white bg-red-500/20 text-red-400 shrink-0">
                  <HiOutlineDocumentText size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-text-secondary font-mono">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end shrink-0">
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 border-2 border-white bg-surface hover:bg-red-500 hover:text-white transition-all text-text-secondary cursor-pointer"
                  disabled={uploadStatus === 'uploading'}
                  title="Remove file"
                >
                  <HiOutlineXMark size={16} />
                </button>

                {uploadStatus !== 'uploading' && (
                  <button
                    type="button"
                    onClick={handleUpload}
                    className="font-['Press_Start_2P'] text-[9px] px-4 py-2 border-2 border-white bg-accent-green text-white font-bold shadow-[3px_3px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-green-500 cursor-pointer uppercase flex items-center gap-2"
                  >
                    UPLOAD & ANALYZE
                    <HiOutlineArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
          )}

          {uploadStatus === 'uploading' && (
            <div className="w-full mt-6 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2 font-['Press_Start_2P'] text-[9px] text-accent animate-pulse">
                <HiOutlineArrowPath size={10} className="animate-spin" />
                <span>[ PROCESSING DOCUMENT: {uploadProgress}% ]</span>
              </div>
              <div className="w-full h-6 border-4 border-white bg-surface overflow-hidden p-0.5 relative">
                <div
                  className="h-full bg-accent transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white font-bold select-none mix-blend-difference">
                  {uploadProgress}%
                </div>
              </div>
              <p className="text-[10px] text-text-secondary mt-2 text-center animate-pulse">
                Parsing text and building semantic embeddings...
              </p>
            </div>
          )}

          {/* Success View */}
          {uploadStatus === 'success' && (
            <div className="w-full border-4 border-white bg-surface-light p-6 shadow-[6px_6px_0px_0px_#000] flex flex-col items-center text-center">
              <div className="p-3 border-2 border-white bg-accent-green/20 text-accent-green mb-4">
                <HiOutlineCheckCircle size={40} />
              </div>
              <h3 className="font-['Press_Start_2P'] text-xs sm:text-sm text-white mb-2 uppercase">
                UPLOAD SUCCESSFUL!
              </h3>
              <p className="text-sm text-text-secondary mb-6 font-['Pixelify_Sans']">
                File <span className="text-white font-bold">{file?.name}</span> was processed successfully.
                {uploadResult?.chunks && (
                  <span className="block mt-2 text-accent">
                    Generated {uploadResult.chunks} interactive study chunks.
                  </span>
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <button
                  type="button"
                  onClick={handleClear}
                  className="font-['Press_Start_2P'] text-[9px] px-4 py-3 border-2 border-white bg-surface text-text-secondary hover:text-white transition-all shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-surface-lighter cursor-pointer uppercase"
                >
                  Upload Another
                </button>
                <a
                  href="/chat"
                  onClick={(e) => {
                    e.preventDefault();

                    window.location.hash = '#chat';
                  }}
                  className="font-['Press_Start_2P'] text-[9px] px-4 py-3 border-2 border-white bg-primary text-white font-bold transition-all shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-primary-light cursor-pointer uppercase no-underline flex items-center justify-center gap-1"
                >
                  Open Chat
                  <HiOutlineArrowRight size={10} />
                </a>
              </div>
            </div>
          )}

          {/* Error Message Box */}
          {uploadStatus === 'error' && errorMessage && (
            <div className="w-full mt-6 border-4 border-red-500 bg-red-950/20 p-4 shadow-[4px_4px_0px_0px_#000] flex items-start gap-3">
              <div className="p-1 border-2 border-red-500 text-red-500 shrink-0">
                <HiOutlineExclamationCircle size={16} />
              </div>
              <div className="flex-1">
                <p className="font-['Press_Start_2P'] text-[9px] text-red-500 mb-1 uppercase">
                  ERROR OCCURRED
                </p>
                <p className="text-xs text-text-secondary font-mono leading-relaxed">{errorMessage}</p>
                <button
                  type="button"
                  onClick={() => setUploadStatus('idle')}
                  className="text-[10px] text-accent underline mt-2 hover:text-accent/80 block uppercase font-bold"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};