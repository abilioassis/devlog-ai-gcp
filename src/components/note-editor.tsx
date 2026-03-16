"use client"

import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, FilePlus2 } from "lucide-react"

const STORAGE_KEY = "devlog-draft-note"
const DEFAULT_TEXT = "# Título da Nota\n\nComece a digitar em **Markdown** aqui."

export function NoteEditor() {
  const [content, setContent] = useLocalStorage<string>(STORAGE_KEY, DEFAULT_TEXT)
  const [isSaved, setIsSaved] = useState(false)

  // This prevents hydration mismatch by relying on the client side default but ensures
  // the hook takes over. The hook handles hydration but briefly we might flash.
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    if (isSaved) setIsSaved(false)
  }

  const handleSave = () => {
    // Content is already saved automatically to localStorage due to the hook.
    // This provides visual feedback to the user.
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleNewNote = () => {
    if(window.confirm("Você tem certeza? Isso limpará a nota atual!")) {
        setContent("")
    }
  }

  if(!mounted) {
      return null;
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Editor Markdown</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleNewNote} className="gap-2">
             <FilePlus2 className="w-4 h-4" />
             Nova Nota
          </Button>
          <Button onClick={handleSave} className="gap-2">
             <Save className="w-4 h-4" />
             {isSaved ? "Salvo" : "Salvar"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-10rem)]">
        {/* Editor (Textarea) */}
        <div className="flex flex-col gap-2 h-full">
          <label htmlFor="markdown-editor" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Escrita (Markdown)
          </label>
          <Textarea 
            id="markdown-editor"
            value={content}
            onChange={handleChange}
            placeholder="Digite algo em markdown..."
            className="flex-1 resize-none font-mono text-sm leading-relaxed"
          />
        </div>

        {/* Preview (Card) */}
        <div className="flex flex-col gap-2 h-full">
            <span className="text-sm font-medium leading-none">
                Visualização
            </span>
            <Card className="flex-1 overflow-auto">
                <CardContent className="p-4 prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
