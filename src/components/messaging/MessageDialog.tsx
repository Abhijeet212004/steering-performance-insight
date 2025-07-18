import { useState } from 'react';
import { Send, User, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface MessageDialogProps {
  trigger: React.ReactNode;
  defaultRecipient?: {
    id: string;
    name: string;
    role: string;
  };
  senderRole: string;
}

const recipients = [
  { id: '1', name: 'Anna Martinez', role: 'Worker', status: 'active' },
  { id: '2', name: 'Tom Rodriguez', role: 'Worker', status: 'active' },
  { id: '3', name: 'Sarah Johnson', role: 'Floor Manager', status: 'active' },
  { id: '4', name: 'Mike Wilson', role: 'Unit Head', status: 'active' },
  { id: '5', name: 'Lisa Chen', role: 'Plant Head', status: 'active' },
];

const urgencyLevels = [
  { value: 'low', label: 'Low Priority', color: 'bg-blue-500' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-orange-500' },
  { value: 'high', label: 'High Priority', color: 'bg-red-500' },
  { value: 'urgent', label: 'Urgent', color: 'bg-purple-500' },
];

export function MessageDialog({ trigger, defaultRecipient, senderRole }: MessageDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(defaultRecipient?.id || '');
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!selectedRecipient || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a recipient and enter a message.",
        variant: "destructive",
      });
      return;
    }

    const recipient = recipients.find(r => r.id === selectedRecipient);
    toast({
      title: "Message Sent",
      description: `Message sent to ${recipient?.name}`,
    });

    // Reset form
    setMessage('');
    setSelectedRecipient(defaultRecipient?.id || '');
    setUrgency('medium');
    setOpen(false);
  };

  const filteredRecipients = recipients.filter(r => 
    senderRole === 'admin' || 
    (senderRole === 'floor_manager' && r.role === 'Worker') ||
    (senderRole === 'unit_head' && ['Worker', 'Floor Manager'].includes(r.role))
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Send Message
          </DialogTitle>
          <DialogDescription>
            Send a message to workers or supervisors
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Recipient Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">To</label>
            <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
              <SelectTrigger>
                <SelectValue placeholder="Select recipient..." />
              </SelectTrigger>
              <SelectContent>
                {filteredRecipients.map((recipient) => (
                  <SelectItem key={recipient.id} value={recipient.id}>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{recipient.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {recipient.role}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Urgency Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Priority</label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {urgencyLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${level.color}`} />
                      {level.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* Preview */}
          {selectedRecipient && message && (
            <div className="p-3 bg-secondary/20 rounded-md">
              <p className="text-xs text-muted-foreground">Preview</p>
              <div className="mt-1">
                <p className="text-sm font-medium">
                  To: {recipients.find(r => r.id === selectedRecipient)?.name}
                </p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {message}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendMessage}
            className="industrial-button"
            disabled={!selectedRecipient || !message.trim()}
          >
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}