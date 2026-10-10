import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack
} from '@mui/material';
import {
  RotateCcw,
  Search,
  Scale,
  CheckCircle2,
  X,
  BookOpen,
  FileText,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import {
  DOCUMENT_CATEGORIES,
  getDocumentById,
  type DocumentInfo
} from '../data/documentTypes';

interface DocumentSelectMenuProps {
  selectedId: string;
  onSelect: (docId: string) => void;
}

export const DocumentSelectMenu: React.FC<DocumentSelectMenuProps> = ({
  selectedId,
  onSelect
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentDoc = getDocumentById(selectedId);

  // Manage expanded accordions (default open the category of currently selected document)
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => ({
    etapa1: false,
    etapa2: true,
    simplificata: false,
    etapa3: false
  }));

  const handleOpen = () => {
    setOpen(true);
    if (currentDoc?.categoryId) {
      setExpanded(prev => ({
        ...prev,
        [currentDoc.categoryId]: true
      }));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSearchQuery('');
  };

  const handleDocumentClick = (docId: string) => {
    onSelect(docId);
    handleClose();
  };

  const handleAccordionToggle = (panelId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(prev => ({ ...prev, [panelId]: isExpanded }));
  };

  // Filter categories and documents based on search query
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return DOCUMENT_CATEGORIES;

    return DOCUMENT_CATEGORIES.map(category => {
      const matchingDocs = category.documents.filter(doc => {
        const inTitle = doc.title.toLowerCase().includes(query);
        const inLegal = doc.legalBase.toLowerCase().includes(query);
        const inPurpose = doc.purpose.toLowerCase().includes(query);
        const inQuote = doc.legalQuote.toLowerCase().includes(query);
        const inTags = doc.tags?.some(tag => tag.toLowerCase().includes(query));
        return inTitle || inLegal || inPurpose || inQuote || inTags;
      });

      return {
        ...category,
        documents: matchingDocs
      };
    }).filter(category => category.documents.length > 0);
  }, [searchQuery]);

  return (
    <>
      {/* ========================================================================= */}
      {/* TRIGGER BUTTON (Emulates & enhances standard select)                     */}
      {/* ========================================================================= */}
      <Button
        variant="outlined"
        onClick={handleOpen}
        endIcon={
          <RotateCcw
            size={18}
            style={{
              color: open ? '#2563eb' : '#64748b',
              transform: open ? 'rotate(-180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease, color 0.2s ease'
            }}
          />
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'left',
          py: 0.75,
          px: 2,
          minWidth: { xs: 280, sm: 380, md: 440 },
          maxWidth: { xs: '100%', md: 540 },
          borderColor: open ? '#2563eb' : '#cbd5e1',
          bgcolor: open ? '#f0f7ff' : '#f8fafc',
          color: '#1e293b',
          borderRadius: '8px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          '&:hover': {
            bgcolor: '#f1f5f9',
            borderColor: '#3b82f6'
          },
          textTransform: 'none'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mr: 2, overflow: 'hidden' }}>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{
              fontWeight: 700,
              color: '#0f172a',
              fontSize: '0.95rem',
              lineHeight: 1.3,
              maxWidth: { xs: 260, sm: 360, md: 460 }
            }}
          >
            {currentDoc?.title || selectedId}
          </Typography>
          {currentDoc?.legalBase && (
            <Typography
              variant="caption"
              noWrap
              sx={{
                color: '#2563eb',
                fontWeight: 600,
                fontSize: '0.78rem',
                lineHeight: 1.2,
                mt: 0.35,
                maxWidth: { xs: 260, sm: 360, md: 460 }
              }}
            >
              {currentDoc.legalBase}
            </Typography>
          )}
        </Box>
      </Button>

      {/* ========================================================================= */}
      {/* DIALOG (Modal with fixed DialogTitle, scrollable DialogContent, Actions)  */}
      {/* ========================================================================= */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        scroll="paper"
        slotProps={{
          paper: {
            sx: {
              borderRadius: '16px',
              bgcolor: '#f8fafc',
              maxHeight: '88vh',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #e2e8f0'
            }
          }
        }}
      >
        {/* ======================================================================= */}
        {/* HEADER: DialogTitle (Fixed at the top, does NOT scroll with content)     */}
        {/* ======================================================================= */}
        <DialogTitle sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
          {/* Top row of Title */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '8px',
                  bgcolor: '#dbeafe',
                  color: '#1d4ed8'
                }}
              >
                <BookOpen size={20} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.15rem' }}>
                Selectare formular
              </Typography>
            </Box>

            <IconButton onClick={handleClose} size="small" sx={{ color: '#64748b' }}>
              <X size={20} />
            </IconButton>
          </Box>

          {/* Search Box inside DialogTitle: Replaces the long subtitle and stays sticky */}
          <TextField
            fullWidth
            size="small"
            placeholder="Caută după denumire document, articol de lege (ex: Art. 294, regularizare, informare, alipire, recepție)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="#64748b" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <X size={16} />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }
            }}
            sx={{
              bgcolor: '#f8fafc',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                borderColor: '#cbd5e1'
              }
            }}
          />
        </DialogTitle>

        {/* ======================================================================= */}
        {/* BODY: DialogContent (Scrollable content area with Category Accordions)   */}
        {/* ======================================================================= */}
        <DialogContent sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: '#f8fafc' }}>
          {filteredCategories.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <FileText size={40} color="#94a3b8" style={{ marginBottom: 8 }} />
              <Typography variant="h6" sx={{ color: '#475569', fontWeight: 600 }}>
                Niciun document nu corespunde căutării „{searchQuery}”
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>
                Încercați să căutați după un cuvânt cheie (ex: construire, notificare, recepție, art. 262) sau resetați căutarea.
              </Typography>
              <Button variant="outlined" size="small" onClick={() => setSearchQuery('')} sx={{ mt: 2 }}>
                Resetează Căutarea
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 0.5 }}>
              {filteredCategories.map((category) => {
                const isPanelExpanded = searchQuery.trim() !== '' || Boolean(expanded[category.id]);

                return (
                  <Accordion
                    key={category.id}
                    expanded={isPanelExpanded}
                    onChange={handleAccordionToggle(category.id)}
                    disableGutters
                    elevation={0}
                    sx={{
                      border: '1px solid #cbd5e1',
                      borderRadius: '12px !important',
                      overflow: 'hidden',
                      bgcolor: '#ffffff',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
                      '&:before': { display: 'none' },
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        borderColor: '#94a3b8',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.06)'
                      }
                    }}
                  >
                    {/* Accordion Summary (Stage Header) */}
                    <AccordionSummary
                      expandIcon={<ChevronDown size={20} color="#475569" />}
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        bgcolor: category.headerBg,
                        borderBottom: isPanelExpanded ? `2px solid ${category.accentColor}` : 'none',
                        '& .MuiAccordionSummary-content': {
                          margin: 0,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: 1
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 800,
                              fontSize: '0.72rem',
                              letterSpacing: '0.5px',
                              color: category.badgeColor,
                              bgcolor: category.badgeBg,
                              px: 1,
                              py: 0.25,
                              borderRadius: '4px'
                            }}
                          >
                            {category.stageName}
                          </Typography>
                          <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: '1rem', color: 'primary.dark' }}>
                            {category.title}
                          </Typography>
                          <Chip
                            size="small"
                            label={`${category.documents.length} formulare`}
                            sx={{
                              height: 22,
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              bgcolor: '#ffffff',
                              color: category.badgeColor,
                              border: `1px solid ${category.badgeBg}`
                            }}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.35 }}>
                          {category.subtitle}
                        </Typography>
                      </Box>

                      <Chip
                        size="small"
                        label={category.legalRange}
                        sx={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          bgcolor: '#ffffff',
                          color: '#334155',
                          border: '1px solid #cbd5e1',
                          display: { xs: 'none', md: 'inline-flex' }
                        }}
                      />
                    </AccordionSummary>

                    {/* Accordion Details (Document Cards in Stage) */}
                    <AccordionDetails sx={{ p: { xs: 1.5, sm: 2.5 }, bgcolor: '#ffffff', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {category.documents.map((doc: DocumentInfo) => {
                        const isSelected = doc.id === selectedId;

                        return (
                          <Box
                            key={doc.id}
                            onClick={() => handleDocumentClick(doc.id)}
                            sx={{
                              p: 1.75,
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.18s ease-in-out',
                              bgcolor: isSelected ? '#f0f9ff' : '#f8fafc',
                              border: isSelected ? '2px solid #0284c7' : '1px solid #e2e8f0',
                              boxShadow: isSelected ? '0 4px 12px rgba(2, 132, 199, 0.15)' : 'none',
                              '&:hover': {
                                bgcolor: isSelected ? '#e0f2fe' : '#f1f5f9',
                                borderColor: isSelected ? '#0284c7' : '#94a3b8',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.06)'
                              }
                            }}
                          >
                            {/* Document Header Row */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.75, gap: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {isSelected && <CheckCircle2 size={18} color="#0284c7" />}
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: '0.92rem',
                                    color: 'primary.main',
                                    textTransform: 'uppercase'
                                  }}
                                >
                                  {doc.title}
                                </Typography>
                              </Box>
                              <Chip
                                size="small"
                                icon={<Scale size={13} style={{ marginLeft: 6 }} />}
                                label={doc.legalBase}
                                variant="outlined"
                                sx={{
                                  fontSize: '0.7rem',
                                  fontWeight: 600,
                                  bgcolor: '#ffffff',
                                  color: '#1e293b',
                                  borderColor: isSelected ? '#bae6fd' : '#cbd5e1',
                                  height: 24
                                }}
                              />
                            </Box>

                            {/* Guidance text with question circle icon */}
                            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 1 }}>
                              <Box
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#0284c7',
                                  flexShrink: 0
                                }}
                              >
                                <HelpCircle size={34} strokeWidth={1.75} />
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: '#334155',
                                  fontSize: '0.81rem',
                                  lineHeight: 1.45
                                }}
                              >
                                {doc.purpose}
                              </Typography>
                            </Stack>

                            {/* Quote from the Law */}
                            <Box
                              sx={{
                                pl: 1.5,
                                borderLeft: `3px solid ${category.accentColor}`,
                                bgcolor: isSelected ? '#ffffff' : '#f1f5f9',
                                py: 0.5,
                                pr: 1,
                                borderRadius: '0 4px 4px 0'
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  fontStyle: 'italic',
                                  color: '#475569',
                                  fontSize: '0.76rem',
                                  display: 'block',
                                  lineHeight: 1.4
                                }}
                              >
                                {doc.legalQuote}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          )}
        </DialogContent>

        {/* ======================================================================= */}
        {/* FOOTER: DialogActions (Fixed at the bottom of the Dialog)               */}
        {/* ======================================================================= */}
        <DialogActions sx={{ px: { xs: 2, sm: 2.5 }, py: 1.5, bgcolor: '#ffffff', borderTop: '1px solid #e2e8f0', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
            Codul Amenajării Teritoriului, Urbanismului și Construcțiilor (Legea nr. 169/2026)
          </Typography>
          <Button onClick={handleClose} variant="outlined" size="small" sx={{ textTransform: 'none', px: 2 }}>
            Închide
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DocumentSelectMenu;
